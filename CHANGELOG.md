## [1.12.1](https://github.com/dejongyeong/portfolio-server/compare/v1.12.0...v1.12.1) (2025-04-06)


### Bug Fixes

* resolve password hashed twice when updating password ([b1f1d00](https://github.com/dejongyeong/portfolio-server/commit/b1f1d00e97ae5db10b31ce73e8d2f69663c7ce87))

# [1.12.0](https://github.com/dejongyeong/portfolio-server/compare/v1.11.2...v1.12.0) (2025-03-31)


### Features

* allow user to get signed url for file upload ([784a617](https://github.com/dejongyeong/portfolio-server/commit/784a617c6a518888db939636583e40760e006587))
* upload image with signed url ([45424c4](https://github.com/dejongyeong/portfolio-server/commit/45424c4e0cac7d9bad137ea222749733a9779e11))

## [1.11.2](https://github.com/dejongyeong/portfolio-server/compare/v1.11.1...v1.11.2) (2025-03-25)


### Bug Fixes

* use port 8080 for gcloud ([1dfaf9a](https://github.com/dejongyeong/portfolio-server/commit/1dfaf9a2f3ef4976c92a185da128e1a7b8a2ba0a))

## [1.11.1](https://github.com/dejongyeong/portfolio-server/compare/v1.11.0...v1.11.1) (2025-03-25)


### Bug Fixes

* do not use legacy key value format ([bd0dfe7](https://github.com/dejongyeong/portfolio-server/commit/bd0dfe704bffeaee82dda2573c9bd65edb2f1f8f))

# [1.11.0](https://github.com/dejongyeong/portfolio-server/compare/v1.10.0...v1.11.0) (2025-03-25)


### Features

* include docker containerization into app ([4dd4ef4](https://github.com/dejongyeong/portfolio-server/commit/4dd4ef41ec2165d0a6c1a9744e271358c6cc3f3a))

# [1.10.0](https://github.com/dejongyeong/portfolio-server/compare/v1.9.0...v1.10.0) (2025-03-25)


### Features

* implement reset password and send reset password link via email ([4883020](https://github.com/dejongyeong/portfolio-server/commit/4883020479d3482da8b30cf21d02ba12a77d8d81))

# [1.9.0](https://github.com/dejongyeong/portfolio-server/compare/v1.8.0...v1.9.0) (2025-03-24)


### Features

* add helmet to protect headers ([54a05f3](https://github.com/dejongyeong/portfolio-server/commit/54a05f37f476a72d61b26636b6bc9cef65dc4e11))

# [1.8.0](https://github.com/dejongyeong/portfolio-server/compare/v1.7.0...v1.8.0) (2025-03-24)


### Features

* add rate limiting to all routes ([dc3c0c8](https://github.com/dejongyeong/portfolio-server/commit/dc3c0c85de6e36292b7fe17dc668c697daf2eb67))
* add versioning to api routes ([c815c23](https://github.com/dejongyeong/portfolio-server/commit/c815c2331076c7e335a56d7d1f5ae29df820a59a))

# [1.7.0](https://github.com/dejongyeong/portfolio-server/compare/v1.6.1...v1.7.0) (2025-03-23)


### Features

* create session resources to handle refresh token ([072e414](https://github.com/dejongyeong/portfolio-server/commit/072e4143f5972e57af51801abe5a910b6a871d5e))

## [1.6.1](https://github.com/dejongyeong/portfolio-server/compare/v1.6.0...v1.6.1) (2025-03-22)


### Bug Fixes

* revert and reset db ([c12660c](https://github.com/dejongyeong/portfolio-server/commit/c12660c06e072f9884ec19e05401a2702a8d73cd))

# [1.6.0](https://github.com/dejongyeong/portfolio-server/compare/v1.5.0...v1.6.0) (2025-03-22)


### Features

* user authentication with passport-jwt ([4a977ae](https://github.com/dejongyeong/portfolio-server/commit/4a977ae97949451e089b74862088ca6acbb465e5))

# [1.5.0](https://github.com/dejongyeong/portfolio-server/compare/v1.4.0...v1.5.0) (2025-03-21)


### Features

* add error handling during crud operations ([a5e7037](https://github.com/dejongyeong/portfolio-server/commit/a5e7037bdd193c12d56abdf1a1d63af74311930f))

# [1.4.0](https://github.com/dejongyeong/portfolio-server/compare/v1.3.0...v1.4.0) (2025-03-19)


### Features

* implement crud operations for project model ([154aa22](https://github.com/dejongyeong/portfolio-server/commit/154aa227844ca4dd07e4b14eaecd34e48bf8b7b4))

# [1.3.0](https://github.com/dejongyeong/portfolio-server/compare/v1.2.0...v1.3.0) (2025-03-19)


### Bug Fixes

* use full relative path ([bac7d72](https://github.com/dejongyeong/portfolio-server/commit/bac7d72d8d69638dc7f64c23eb1bd4f2b7bbd582))


### Features

* implement crud operations for publication model ([9873639](https://github.com/dejongyeong/portfolio-server/commit/9873639695d7bd9085e9bc24c46fca51dc7d62fd))

# [1.2.0](https://github.com/dejongyeong/portfolio-server/compare/v1.1.1...v1.2.0) (2025-03-19)


### Features

* add swagger openapi description ([7d19292](https://github.com/dejongyeong/portfolio-server/commit/7d192920ea8942c69966a0f5a48618e3cd4fa693))

## [1.1.1](https://github.com/dejongyeong/portfolio-server/compare/v1.1.0...v1.1.1) (2025-03-18)


### Bug Fixes

* fix unable to read env during ci ([89bfbb6](https://github.com/dejongyeong/portfolio-server/commit/89bfbb6b1ed506e01082d4030a526eb6049c9d76))

# [1.1.0](https://github.com/dejongyeong/portfolio-server/compare/v1.0.0...v1.1.0) (2025-03-18)


### Features

* prisma postgresql integration ([c8de3fe](https://github.com/dejongyeong/portfolio-server/commit/c8de3fe1e641673877d11699a79aa38fe2a8014f))

# 1.0.0 (2025-03-18)


### Features

* create configuration to read from .env ([8340baf](https://github.com/dejongyeong/portfolio-server/commit/8340baf4ce0f963e2c8207726690d1c7a8a85777))
* migrate jest testing to vitest ([1740982](https://github.com/dejongyeong/portfolio-server/commit/17409827140f7b8f00ec00f39302fbcaf2d2a587))
* scaffold project with commitlint, husky, and lintstaged ([43a983d](https://github.com/dejongyeong/portfolio-server/commit/43a983d9d0ae3cba0c209db6f3ae7766f90b6a9a))
* semantic release with github actions integration ([d0f8bd3](https://github.com/dejongyeong/portfolio-server/commit/d0f8bd30b6a7e43a0b81b7502d0425de98f0e7b0))
