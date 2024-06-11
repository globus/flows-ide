# Changelog

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
