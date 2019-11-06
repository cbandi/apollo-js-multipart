import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import options from 'options';

const cache = new InMemoryCache({
  cacheRedirects: {}
});

const request = async operation => {
  operation.setContext({
    headers: {
      Authorization: options.Authorization
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);
const httpOptions = {
  uri: options.URL
};
const httpLink = ApolloLink.split(
  operation => operation.getContext().fileUpload,
  createUploadLink(httpOptions),
  new BatchHttpLink(httpOptions)
);
let apolloJSMultipart = new ApolloClient({
  link: ApolloLink.from([requestLink, httpLink]),
  cache
});

module.exports = apolloJSMultipart;
