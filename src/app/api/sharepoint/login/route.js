import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

export const runtime = "nodejs";

function buildMsalConfig({ tenantID, clientID }) {
  const authority = `https://login.microsoftonline.com/${tenantID}`;
  // const clientSecret = process.env.ENTRA_CLIENT_SECRET;

  // if (clientSecret) {
  //   return {
  //     auth: {
  //       clientId: clientID,
  //       authority,
  //       clientSecret,
  //     },
  //   };
  // }

  const base64PrivateKey = process.env.ENTRA_PRIVATE_KEY_BASE64;
  const thumbprint = process.env.ENTRA_CERT_THUMBPRINT?.replace(/:/g, "");
  console.log("MSAL config", JSON.stringify({ privateKey: Buffer.from(base64PrivateKey, "base64").toString("ascii"), thumbprint: thumbprint }));
  if (base64PrivateKey && thumbprint) {
    return {
      auth: {
        clientId: clientID,
        authority,
        clientCertificate: {
          thumbprint,
          privateKey: Buffer.from(base64PrivateKey, "base64").toString("ascii"),
        },
      },
    };
  }

  throw new Error(
    "Missing SharePoint auth credentials. Set ENTRA_CLIENT_SECRET or ENTRA_PRIVATE_KEY_BASE64 and ENTRA_CERT_THUMBPRINT.",
  );
}

export async function POST(request) {
  const body = await request.json();
  const { tenantID, clientID, tenantName } = body;
  try {
    const msalConfig = buildMsalConfig({ tenantID, clientID });
    const cca = new ConfidentialClientApplication(msalConfig);
    const tokenResponse = await cca.acquireTokenByClientCredential({
      scopes: [`https://${tenantName}.sharepoint.com/.default`],
    });

    const accessToken = `${tokenResponse?.accessToken || ""}`;
    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown SharePoint auth error";
    return NextResponse.json(
      { error: err.response?.data || message },
      { status: 500 },
    );
  }
}
