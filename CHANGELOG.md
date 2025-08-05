# Changelog

## [2.0.0](https://github.com/globus/flows-ide/compare/flows-ide-v1.5.0...flows-ide-v2.0.0) (2025-08-05)


### ⚠ BREAKING CHANGES

* Flows IDE v2 ([#195](https://github.com/globus/flows-ide/issues/195))

### Features

* Adds support for encoded, gzipped, query parameters ([#280](https://github.com/globus/flows-ide/issues/280)) ([e71947b](https://github.com/globus/flows-ide/commit/e71947b5cc97d0bc55f8b99b3125cd71e796ce58))
* Flows IDE v2 ([#195](https://github.com/globus/flows-ide/issues/195)) ([5d3c99a](https://github.com/globus/flows-ide/commit/5d3c99af6be3c211788193f06cf70cef97acd41b))


### Bug Fixes

* updates Dependabot configuration to use groups ([5132d83](https://github.com/globus/flows-ide/commit/5132d83b84d1f093c55f9328d8e9911701f2093e))

## [1.5.0](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.7...flows-ide-v1.5.0) (2025-07-07)


### Features

* adds SST ([#258](https://github.com/globus/flows-ide/issues/258)) ([da9fc9c](https://github.com/globus/flows-ide/commit/da9fc9cff8852585973f40d1fe2274550244cc48))


### Bug Fixes

* adds npm install to GitHub Actions ([9ffd245](https://github.com/globus/flows-ide/commit/9ffd245d25039f5814c79081fb177db31670e5f0))

## [1.4.7](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.6...flows-ide-v1.4.7) (2025-04-16)


### Bug Fixes

* Updates Compute AP entry to reference V3 action provider. ([#222](https://github.com/globus/flows-ide/issues/222)) ([31d8f80](https://github.com/globus/flows-ide/commit/31d8f80f8d4dff781c65201acb23bc5af5bbfb2a))

## [1.4.6](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.5...flows-ide-v1.4.6) (2025-04-16)


### Bug Fixes

* Avoid crashes in layout when a State name is removed from the definition ([bfdd52a](https://github.com/globus/flows-ide/commit/bfdd52a410b50afb99389006a33c0b427a8a3915))

## [1.4.5](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.4...flows-ide-v1.4.5) (2025-04-08)


### Bug Fixes

* Addresses issue causing 'Validate' button to be hidden behind editor ([e17ab89](https://github.com/globus/flows-ide/commit/e17ab8919247003bdc5e443599eeda404abe770a))

## [1.4.4](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.3...flows-ide-v1.4.4) (2025-04-08)


### Bug Fixes

* Ensure session refresh rejected states are handled properly ([60a1264](https://github.com/globus/flows-ide/commit/60a1264a9df6921deec3d4e3bb9885d29f38378c))

## [1.4.3](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.2...flows-ide-v1.4.3) (2025-04-08)


### Bug Fixes

* only store definition when a value is present ([107d95f](https://github.com/globus/flows-ide/commit/107d95fe2bb7bc5d798876a48e195f0c771b0e81))

## [1.4.2](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.1...flows-ide-v1.4.2) (2024-10-09)


### Bug Fixes

* ensure sessions are refereshed on load, prompt for sign in on failure ([#129](https://github.com/globus/flows-ide/issues/129)) ([6fecf78](https://github.com/globus/flows-ide/commit/6fecf78491ab5df67e25912ed773e23893adacd2))

## [1.4.1](https://github.com/globus/flows-ide/compare/flows-ide-v1.4.0...flows-ide-v1.4.1) (2024-09-18)


### Bug Fixes

* address Next.js build errors ([70a37e4](https://github.com/globus/flows-ide/commit/70a37e49844d71b32a4d8f67e9f50acf968da5cf))

## [1.4.0](https://github.com/globus/flows-ide/compare/flows-ide-v1.3.0...flows-ide-v1.4.0) (2024-09-18)


### Features

* adds optional authentication and Flow service definition validation. ([8578878](https://github.com/globus/flows-ide/commit/8578878048c02a7301bcfbb8dab99dbe1c3b0be8))

## [1.3.0](https://github.com/globus/flows-ide/compare/flows-ide-v1.2.0...flows-ide-v1.3.0) (2024-06-11)


### Features

* adds button in Action Provider documentation to allow adding an action provider as a step. ([#44](https://github.com/globus/flows-ide/issues/44)) ([d8cbecf](https://github.com/globus/flows-ide/commit/d8cbecf0067795ca38f8f9e1aeb12b4b9a87f171))

## [1.2.0](https://github.com/globus/flows-ide/compare/v1.1.0...v1.2.0) (2024-04-29)


### Features

* add edge labels to catch, choice and default ([7cfff33](https://github.com/globus/flows-ide/commit/7cfff332fcccbf23466b5c86617041ecfb88ca4e))
* add support for clicking a node and focusing that State position in the editor ([c686a63](https://github.com/globus/flows-ide/commit/c686a63030750b78776ddf1586bde5621c50c21e))
* add version to header ([6cede67](https://github.com/globus/flows-ide/commit/6cede67af28f1306e8f027db2fd41eac101baa61))
* adds scaffold for basic documentation browser ([f9d469e](https://github.com/globus/flows-ide/commit/f9d469ea37b8c89253a3ea442605fb5815e7c85e))
* allow users to reorganize nodes in the node diagram. ([#17](https://github.com/globus/flows-ide/issues/17)) ([3cdc6fb](https://github.com/globus/flows-ide/commit/3cdc6fb7977840fdcd472b1192d936c4d882fd13))
* **Diagram:** general improvements to rendering. ([d827436](https://github.com/globus/flows-ide/commit/d827436b34ed5a2999ccff50edfecb0955f6a6af))
* **Diagram:** support for Choice/Choices, Default and Catch. ([d827436](https://github.com/globus/flows-ide/commit/d827436b34ed5a2999ccff50edfecb0955f6a6af))
* **Documentation:** adds Transfer and Compute Action Providers to the documentation panel. ([#7](https://github.com/globus/flows-ide/issues/7)) ([3cadfb1](https://github.com/globus/flows-ide/commit/3cadfb1cbf3e7de32fe9b3da1475b563e3eea85a))
* enable schema validation ([4876077](https://github.com/globus/flows-ide/commit/4876077d96ae904fd0b805b4a717503984067f1b))
* filter non-errors from markers presented in the diagram; warnings no longer block rendering. ([#32](https://github.com/globus/flows-ide/issues/32)) ([4876077](https://github.com/globus/flows-ide/commit/4876077d96ae904fd0b805b4a717503984067f1b))
* Globus branding and configuration ([34fc16f](https://github.com/globus/flows-ide/commit/34fc16f795144f8a656758f5a560884ce17ecb55))
* load and use Flow definition schema for autocomplete ([#30](https://github.com/globus/flows-ide/issues/30)) ([cea01ec](https://github.com/globus/flows-ide/commit/cea01ecd239d982d656d4637de9c193c1c9d1e4d))
* use dagre for auto-layout ([258bb0b](https://github.com/globus/flows-ide/commit/258bb0be7084b1ef2a5792772f29d92e1bc0cc3f))


### Bug Fixes

* address issue preventing version from being displayed in header ([0d5a0e5](https://github.com/globus/flows-ide/commit/0d5a0e5263d5f60a8882ab19f35a78beb81ef1f2))
* **DevOps:** ensure auto-deployment on version tags ([e1c4134](https://github.com/globus/flows-ide/commit/e1c41342e729bd66195b9a1c8da84ce1a2e9fbbb))
* **Diagram:** fix for missing handles on 'Fail' types ([4987d76](https://github.com/globus/flows-ide/commit/4987d76d24c8e9d8f174d0086cc78887c493ac2b))
* DOM nesting issue in StateNode ([#33](https://github.com/globus/flows-ide/issues/33)) ([7cfff33](https://github.com/globus/flows-ide/commit/7cfff332fcccbf23466b5c86617041ecfb88ca4e))
* improved diagram rendering, better overall layout, and dark mode editor. ([c79465e](https://github.com/globus/flows-ide/commit/c79465e8d684e81de636057e236da94d1b9dde90))

## [1.1.0](https://github.com/globus/flows-ide/compare/flows-ide-v1.0.2...flows-ide-v1.1.0) (2024-04-11)


### Features

* add edge labels to catch, choice and default ([7cfff33](https://github.com/globus/flows-ide/commit/7cfff332fcccbf23466b5c86617041ecfb88ca4e))
* enable schema validation ([4876077](https://github.com/globus/flows-ide/commit/4876077d96ae904fd0b805b4a717503984067f1b))
* filter non-errors from markers presented in the diagram; warnings no longer block rendering. ([#32](https://github.com/globus/flows-ide/issues/32)) ([4876077](https://github.com/globus/flows-ide/commit/4876077d96ae904fd0b805b4a717503984067f1b))
* load and use Flow definition schema for autocomplete ([#30](https://github.com/globus/flows-ide/issues/30)) ([cea01ec](https://github.com/globus/flows-ide/commit/cea01ecd239d982d656d4637de9c193c1c9d1e4d))


### Bug Fixes

* DOM nesting issue in StateNode ([#33](https://github.com/globus/flows-ide/issues/33)) ([7cfff33](https://github.com/globus/flows-ide/commit/7cfff332fcccbf23466b5c86617041ecfb88ca4e))

## [1.0.2](https://github.com/globus/flows-ide/compare/flows-ide-v1.0.1...flows-ide-v1.0.2) (2024-04-09)


### Bug Fixes

* **DevOps:** ensure auto-deployment on version tags ([e1c4134](https://github.com/globus/flows-ide/commit/e1c41342e729bd66195b9a1c8da84ce1a2e9fbbb))

## [1.0.1](https://github.com/globus/flows-ide/compare/flows-ide-v1.0.0...flows-ide-v1.0.1) (2024-04-09)


### Bug Fixes

* address issue preventing version from being displayed in header ([0d5a0e5](https://github.com/globus/flows-ide/commit/0d5a0e5263d5f60a8882ab19f35a78beb81ef1f2))

## 1.0.0 (2024-04-09)


### Features

* add support for clicking a node and focusing that State position in the editor ([c686a63](https://github.com/globus/flows-ide/commit/c686a63030750b78776ddf1586bde5621c50c21e))
* add version to header ([6cede67](https://github.com/globus/flows-ide/commit/6cede67af28f1306e8f027db2fd41eac101baa61))
* adds scaffold for basic documentation browser ([f9d469e](https://github.com/globus/flows-ide/commit/f9d469ea37b8c89253a3ea442605fb5815e7c85e))
* allow users to reorganize nodes in the node diagram. ([#17](https://github.com/globus/flows-ide/issues/17)) ([3cdc6fb](https://github.com/globus/flows-ide/commit/3cdc6fb7977840fdcd472b1192d936c4d882fd13))
* **Diagram:** general improvements to rendering. ([d827436](https://github.com/globus/flows-ide/commit/d827436b34ed5a2999ccff50edfecb0955f6a6af))
* **Diagram:** support for Choice/Choices, Default and Catch. ([d827436](https://github.com/globus/flows-ide/commit/d827436b34ed5a2999ccff50edfecb0955f6a6af))
* **Documentation:** adds Transfer and Compute Action Providers to the documentation panel. ([#7](https://github.com/globus/flows-ide/issues/7)) ([3cadfb1](https://github.com/globus/flows-ide/commit/3cadfb1cbf3e7de32fe9b3da1475b563e3eea85a))
* Globus branding and configuration ([34fc16f](https://github.com/globus/flows-ide/commit/34fc16f795144f8a656758f5a560884ce17ecb55))
* use dagre for auto-layout ([258bb0b](https://github.com/globus/flows-ide/commit/258bb0be7084b1ef2a5792772f29d92e1bc0cc3f))


### Bug Fixes

* **Diagram:** fix for missing handles on 'Fail' types ([4987d76](https://github.com/globus/flows-ide/commit/4987d76d24c8e9d8f174d0086cc78887c493ac2b))
* improved diagram rendering, better overall layout, and dark mode editor. ([c79465e](https://github.com/globus/flows-ide/commit/c79465e8d684e81de636057e236da94d1b9dde90))
