# Globus Flows IDE `BETA`

A Web-based IDE for building [Globus Flows](https://docs.globus.org/api/flows/) – [open the Globus Flows IDE](https://globus.github.io/flows-ide/).

<img alt="Screenshot of the Globus Flows IDE" src="https://github.com/user-attachments/assets/aa6e40ac-254f-48d4-bb72-a7824cf7d797" />

## Features

### Sharing Flows IDE State

Your Flows IDE state can be shared with others via a URL using the built-in "Share" button, or by manually constructing a URL with the following query parameters:

- `d=` - The definition to be loaded.
- `s=` - The input schema to be loaded.
- `format=` - The compression format (e.g., `gzip`, `lz`, or `none`) used by the `d` and `s` parameters. If not specified, the default is `lz`.
  - `gzip` - The parameter values are compressed using gzip and base64 encoded.
  - `lz` - The parameter values are compressed using lz and base64 encoded.
  - `none` - The parameter values are not compressed, only URL encoded.
    - Using `none` is not recommended for large definitions or schemas, as it may result in URLs that exceed the maximum length supported by browsers.

Examples

- Basic Example with `format=none`
  - [`https://globus.github.io/flows-ide?format=none&d={%22States%22:%20{%22HelloWorld%22:%20{}}}`](https://globus.github.io/flows-ide?format=none&d={%22States%22:%20{%22HelloWorld%22:%20{}}})
- Simple Transfer with `format=gzip`, a definition (`d`) and input schema (`s`)
  - [`https://globus.github.io/flows-ide?d=H4sIAAAAAAAAE12NPQsCMRBE%2F8tgGaKt2x1oL3hiISLRrBrQ5NjsFXLkv8v5edoNbx4zHZbqRCsFoRYX85EFpofKGdR9YZ9vDYNQHTSkCPMKK7mAcFZtMo3H%2BvKte5TZni5p32ab5PTpYLB2QetwZdB0MjFYOHFXVpbH56yqK9CmQ06tHHjXOD3bEQgj%2ByS2JzDwnDVE1x8NpQF%2BmmVr3lscfZNC1N%2B94P%2FW%2FrThYvAoBvPoQSotl1Luj0LGCEUBAAA%3D&s=H4sIAAAAAAAAE9WPQQ7CMAwE%2F7Ln8IF8Au6IQxq7YBSa4jiHqurfUVGRWlWCM2ePZ3dH2NAzPHJz52hw6DX3rDYclVjhzyi5amQ4EBeTLpjkDhcH5WcVZfrGLDLhAj9%2BKD%2FuQtusj2DwuKbc1HKIOSWOb8s2SGiuGOy2twutzMVUuuvaXKsQpuV5B06TQyCSOTKk00rchlR42i77xwU%2Fzi8%2Bk3CECQIAAA%3D%3D&format=gzip`](https://globus.github.io/flows-ide?d=H4sIAAAAAAAAE12NPQsCMRBE%2F8tgGaKt2x1oL3hiISLRrBrQ5NjsFXLkv8v5edoNbx4zHZbqRCsFoRYX85EFpofKGdR9YZ9vDYNQHTSkCPMKK7mAcFZtMo3H%2BvKte5TZni5p32ab5PTpYLB2QetwZdB0MjFYOHFXVpbH56yqK9CmQ06tHHjXOD3bEQgj%2ByS2JzDwnDVE1x8NpQF%2BmmVr3lscfZNC1N%2B94P%2FW%2FrThYvAoBvPoQSotl1Luj0LGCEUBAAA%3D&s=H4sIAAAAAAAAE9WPQQ7CMAwE%2F7Ln8IF8Au6IQxq7YBSa4jiHqurfUVGRWlWCM2ePZ3dH2NAzPHJz52hw6DX3rDYclVjhzyi5amQ4EBeTLpjkDhcH5WcVZfrGLDLhAj9%2BKD%2FuQtusj2DwuKbc1HKIOSWOb8s2SGiuGOy2twutzMVUuuvaXKsQpuV5B06TQyCSOTKk00rchlR42i77xwU%2Fzi8%2Bk3CECQIAAA%3D%3D&format=gzip)

## Contributing

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Important Architecture Details

- This project uses a `.env` file to [configure environment variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- The Next.js configuration (and feature set) should be limited to [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) to ensure compatibility with GitHub Pages.

### Running the Development Server

```bash
npm run dev
```

The application will be available on the Next.js host – since the application assumes the default GitHub Pages run-time, the basepath is configured to `/flows-ide` (requests to `/` will result in a `404`).

## Deployment

The production deployment is currently hosted on GitHub Pages at [https://globus.github.io/flows-ide/](https://globus.github.io/flows-ide/).

Deployments to this environment will automatically occur when a new release is created via `release-please`.

## `sandbox`

The `sandbox` environment is available at: [https://d1ohs99wfl8za4.cloudfront.net/](https://d1ohs99wfl8za4.cloudfront.net/).

This environment is deployed using [SST](https://sst.dev/) and is automatically updated when changes are pushed to the `main` branch.
