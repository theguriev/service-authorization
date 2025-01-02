# Changelog


## v0.0.1


### 🚀 Enhancements

- Working on auto import ([a1829f7](https://github.com/theguriev/service-authorization/commit/a1829f7))
- Working on authorization ([c19d7af](https://github.com/theguriev/service-authorization/commit/c19d7af))
- Add forgot-password route ([2524b14](https://github.com/theguriev/service-authorization/commit/2524b14))
- Add dockerfile ([4ca1c45](https://github.com/theguriev/service-authorization/commit/4ca1c45))
- Add dockerignore ([b2d6ea0](https://github.com/theguriev/service-authorization/commit/b2d6ea0))
- Add github actions yml ([1deaa06](https://github.com/theguriev/service-authorization/commit/1deaa06))
- Add expose port ([48e6341](https://github.com/theguriev/service-authorization/commit/48e6341))
- Add eslint ([feb4ce5](https://github.com/theguriev/service-authorization/commit/feb4ce5))
- Add test-utils.ts and index.test.ts ([be87f3d](https://github.com/theguriev/service-authorization/commit/be87f3d))
- Add MongoDB memory server and login.post test ([7485d31](https://github.com/theguriev/service-authorization/commit/7485d31))
- Add imports for set-cookie-parser and parse function ([77a1f95](https://github.com/theguriev/service-authorization/commit/77a1f95))
- Add unit and API tests for token generation and index rendering ([02acb1c](https://github.com/theguriev/service-authorization/commit/02acb1c))
- Add logout route implementation ([0e42e58](https://github.com/theguriev/service-authorization/commit/0e42e58))
- Update .gitignore and add verify utility function ([d0cc4fe](https://github.com/theguriev/service-authorization/commit/d0cc4fe))
- Add timestamp field to user schema and implement password confirmation in registration ([8159d8e](https://github.com/theguriev/service-authorization/commit/8159d8e))
- Add refresh route and update authorization-flow test ([f2744ba](https://github.com/theguriev/service-authorization/commit/f2744ba))
- Update base image and install PNPM ([1469583](https://github.com/theguriev/service-authorization/commit/1469583))
- Add refreshToken and accessToken to the returned user object ([7661aeb](https://github.com/theguriev/service-authorization/commit/7661aeb))
- Add zodValidateBody and zodValidateData utility functions ([38e2991](https://github.com/theguriev/service-authorization/commit/38e2991))
- Add validation error tests for login and forgot password endpoints ([b9051ab](https://github.com/theguriev/service-authorization/commit/b9051ab))
- Add experimental openAPI flag and delete access and refresh tokens on logout ([594ea7e](https://github.com/theguriev/service-authorization/commit/594ea7e))
- Add Swagger documentation for Nitro Server Routes ([b831da0](https://github.com/theguriev/service-authorization/commit/b831da0))
- Update refresh token endpoint in swagger.json ([aba1bf2](https://github.com/theguriev/service-authorization/commit/aba1bf2))
- Add user registration endpoint and request schema ([7e3880a](https://github.com/theguriev/service-authorization/commit/7e3880a))
- Add LoginRequest and LoginResponse schemas and update /login endpoint ([4027619](https://github.com/theguriev/service-authorization/commit/4027619))
- Add ForgotPasswordRequest and ForgotPasswordResponse schemas and update /forgot-password endpoint ([8a9de65](https://github.com/theguriev/service-authorization/commit/8a9de65))
- Add ForgotValidationError schema to swagger.json ([960db8f](https://github.com/theguriev/service-authorization/commit/960db8f))
- Update validation error schema in swagger.json ([0fc5012](https://github.com/theguriev/service-authorization/commit/0fc5012))
- Add required fields to user schemas ([ff75af6](https://github.com/theguriev/service-authorization/commit/ff75af6))
- Add required fields to error response schema ([1901286](https://github.com/theguriev/service-authorization/commit/1901286))
- Change HTTP method for /refresh endpoint ([71946f2](https://github.com/theguriev/service-authorization/commit/71946f2))
- Add change-name route and authorization tests ([8b66a4c](https://github.com/theguriev/service-authorization/commit/8b66a4c))
- Add API endpoint to change user name ([87801bf](https://github.com/theguriev/service-authorization/commit/87801bf))
- Update package.json dependencies ([666d64d](https://github.com/theguriev/service-authorization/commit/666d64d))

### 🩹 Fixes

- Login functionality and add test for valid credentials ([03ee9b6](https://github.com/theguriev/service-authorization/commit/03ee9b6))
- Refresh token value in authorization header ([3cb5e77](https://github.com/theguriev/service-authorization/commit/3cb5e77))
- Typo in error message ([3125b19](https://github.com/theguriev/service-authorization/commit/3125b19))

### 💅 Refactors

- Request body schema ([64da9e6](https://github.com/theguriev/service-authorization/commit/64da9e6))
- User authentication and authorization flow ([68c78a9](https://github.com/theguriev/service-authorization/commit/68c78a9))
- Registration.post.ts and authorization-flow.test.ts ([32f3a89](https://github.com/theguriev/service-authorization/commit/32f3a89))
- Error handling in routes ([30c92bf](https://github.com/theguriev/service-authorization/commit/30c92bf))
- User serialization in refresh route ([7a8c686](https://github.com/theguriev/service-authorization/commit/7a8c686))
- Token handling and return user object only ([b78f189](https://github.com/theguriev/service-authorization/commit/b78f189))
- Password confirmation validation in registration.post.ts ([a72f915](https://github.com/theguriev/service-authorization/commit/a72f915))
- Logout route handler to include token cleanup ([f22a47b](https://github.com/theguriev/service-authorization/commit/f22a47b))
- Update parameter names in swagger.json ([3e28e82](https://github.com/theguriev/service-authorization/commit/3e28e82))
- Remove 'forgotPassword' from required fields in User schema ([46d993d](https://github.com/theguriev/service-authorization/commit/46d993d))
- Change-name route and index route ([35f057c](https://github.com/theguriev/service-authorization/commit/35f057c))
- Logout route and remove invalid logout test ([0e36241](https://github.com/theguriev/service-authorization/commit/0e36241))

### 🏡 Chore

- Initialization ([f0c9f7e](https://github.com/theguriev/service-authorization/commit/f0c9f7e))
- Update dependencies in package.json ([b6a9e6a](https://github.com/theguriev/service-authorization/commit/b6a9e6a))
- Update .gitignore and package.json ([5ad090a](https://github.com/theguriev/service-authorization/commit/5ad090a))

### ✅ Tests

- Add unit tests for utils ([e295cec](https://github.com/theguriev/service-authorization/commit/e295cec))
- Add test files for issuing access and refresh tokens ([c8efc44](https://github.com/theguriev/service-authorization/commit/c8efc44))
- Authorization and add new endpoints ([41c3ac0](https://github.com/theguriev/service-authorization/commit/41c3ac0))
- Add logout functionality to authorization ([3218942](https://github.com/theguriev/service-authorization/commit/3218942))
- Update authorization flow test API ([9d91bdb](https://github.com/theguriev/service-authorization/commit/9d91bdb))

### ❤️ Contributors

- Eugen Guriev ([@theguriev](http://github.com/theguriev))

