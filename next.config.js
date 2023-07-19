const path = require('path');

const ContentSecurityPolicy = `
  default-src all;
  script-src all;
  style-src all 'unsafe-inline';
  font-src 'self';
`;

const nextConfig = {
    /* config options here */
    swcMinify: true,
    compiler: {
        removeConsole: {
            exclude: ['log'],
        },
    },
    // Adding policies:
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // {
                    //     key: 'Content-Security-Policy',
                    //     value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
                    // },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    transpilePackages: [
        "@adobe/react-spectrum",
        "@react-spectrum/actiongroup",
        "@react-spectrum/avatar",
        "@react-spectrum/badge",
        "@react-spectrum/breadcrumbs",
        "@react-spectrum/button",
        "@react-spectrum/buttongroup",
        "@react-spectrum/calendar",
        "@react-spectrum/checkbox",
        "@react-spectrum/color",
        "@react-spectrum/combobox",
        "@react-spectrum/contextualhelp",
        "@react-spectrum/datepicker",
        "@react-spectrum/dialog",
        "@react-spectrum/divider",
        "@react-spectrum/dnd",
        "@react-spectrum/form",
        "@react-spectrum/icon",
        "@react-spectrum/illustratedmessage",
        "@react-spectrum/image",
        "@react-spectrum/label",
        "@react-spectrum/labeledvalue",
        "@react-spectrum/layout",
        "@react-spectrum/link",
        "@react-spectrum/list",
        "@react-spectrum/listbox",
        "@react-spectrum/menu",
        "@react-spectrum/meter",
        "@react-spectrum/numberfield",
        "@react-spectrum/overlays",
        "@react-spectrum/picker",
        "@react-spectrum/progress",
        "@react-spectrum/provider",
        "@react-spectrum/radio",
        "@react-spectrum/slider",
        "@react-spectrum/searchfield",
        "@react-spectrum/statuslight",
        "@react-spectrum/switch",
        "@react-spectrum/table",
        "@react-spectrum/tabs",
        "@react-spectrum/tag",
        "@react-spectrum/text",
        "@react-spectrum/textfield",
        "@react-spectrum/theme-dark",
        "@react-spectrum/theme-default",
        "@react-spectrum/theme-light",
        "@react-spectrum/toast",
        "@react-spectrum/tooltip",
        "@react-spectrum/view",
        "@react-spectrum/well",
        "@spectrum-icons/illustrations",
        "@spectrum-icons/ui",
        "@spectrum-icons/workflow",
    ],
    reactStrictMode: true,
    images: {
        domains: JSON.parse(process.env.domains)
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    }
};

module.exports = nextConfig;