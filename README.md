# 🧪 EXPERIMENTAL 🧪

**⚠️ Until this notice is removed, usage of this repository is NOT recommended and is provided as-is.**

**We're looking forward to sharing more details about this repostiory and more at [GlobusWorld 2024](https://www.globusworld.org/)!**

----

# Globus Flows IDE `BETA`

A Web-based IDE for building [Globus Flows](https://docs.globus.org/api/flows/) – [open the Globus Flows IDE](https://globus.github.io/flows-ide/).

<img width="800" alt="Screenshot of the Globus Flows IDE" src="https://github.com/globus/flows-ide/assets/694253/86406a3c-7b8e-46e1-b4f6-c2b548c71cb9">


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

