# apollo-upload-client

[![npm version](https://badgen.net/npm/v/apollo-upload-client)](https://npm.im/apollo-upload-client) [![Build status](https://travis-ci.org/jaydenseric/apollo-upload-client.svg?branch=master)](https://travis-ci.org/jaydenseric/apollo-upload-client)

A terminating [Apollo Link](https://apollographql.com/docs/link) for [Apollo Client](https://apollographql.com/docs/link#apollo-client) that allows [`FileList`](https://developer.mozilla.org/docs/web/api/filelist), [`File`](https://developer.mozilla.org/docs/web/api/file), [`Blob`](https://developer.mozilla.org/docs/web/api/blob) instances within query or mutation variables and sends [GraphQL multipart requests](https://github.com/jaydenseric/graphql-multipart-request-spec).

## Setup

Install with [npm](https://npmjs.com):

```shell
npm install apollo-js-multipart
```

[Apollo Boost](https://npm.im/apollo-boost) doesn’t allow link customization; if you are using it [migrate to a manual Apollo Client setup](https://apollographql.com/docs/react/advanced/boost-migration).

[Apollo Client](https://apollographql.com/docs/link#apollo-client) can only have 1 “terminating” [Apollo Link](https://apollographql.com/docs/link) that sends the GraphQL requests; if one such as [`apollo-link-http`](https://apollographql.com/docs/link/links/http) is already setup, remove it.

Initialize the client with a terminating link using [`createUploadLink`](#function-createuploadlink).

Also ensure the GraphQL server implements the [GraphQL multipart request spec](https://github.com/jaydenseric/graphql-multipart-request-spec) and that uploads are handled correctly in resolvers.

## Usage

```jsx
import gql from 'graphql-tag';
import VueApollo from 'vue-apollo';
import apolloJSMultipart from 'apollo-js-multipart';

$apollo
  .mutate({
    mutation: QUERY,
    context: {
      fileUpload: this.file ? true : false
    },
    variables: {
      file: this.file
    }
  })
  .then(res => {
    console.log('File Uploaded Successfully');
  })
  .catch(err => {
    console.log('Error while Uploading file');
  });
```
