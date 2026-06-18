import axios from "axios";
import _ from "lodash";

const createDirectory =
  (sharepointClient, baseDirectory = "Shared Documents") =>
  async (directoryPath) => {
    console.log("creating directory", { baseDirectory, directoryPath });
    const response = await sharepointClient.post(
      "folders",
      {
        __metadata: {
          type: "SP.Folder",
        },
        ServerRelativeUrl: `${baseDirectory}/${directoryPath}`,
      },
      {
        headers: {
          "Content-Type": "application/json;odata=verbose",
        },
      },
    );

    return response.data;
  };

const uploadFile =
  (sharepointClient, baseDirectory = "Shared Documents") =>
  async (filePath, fileNameWithExtension, fileContent) => {
    const uploadURL = `GetFolderByServerRelativeUrl('${baseDirectory}/${filePath}')/Files/add(url='${fileNameWithExtension}',overwrite=true)`;
    console.log("uploadFile proscess", { uploadURL, fileContent });
    const response = await sharepointClient.post(uploadURL, fileContent, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });

    return response.data;
  };

const listSharedFolderContents =
  (sharepointClient, baseDirectory = "Shared Documents") =>
  async (folderPath = "") => {
    const serverRelativeUrl = folderPath
      ? `${baseDirectory}/${folderPath}`
      : baseDirectory;
    const endpoint = `GetFolderByServerRelativeUrl('${serverRelativeUrl}')?$expand=Folders,Files`;

    console.log("listing shared folder contents", { endpoint });
    const response = await sharepointClient.get(endpoint);

    return response.data;
  };

export const createSharepointRestClient = async (settings) => {
  const tenantID = _.get(settings, "tenantID", "");
  const appID = _.get(settings, "appID", "");
  const tenantName = _.get(settings, "tenantName", "");
  const clientID = _.get(settings, "clientID", "");
  const siteName = _.get(settings, "siteName", "");
  const baseUploadDirectory = _.get(settings, "baseUploadDirectory", "");

  const getAccessToken = async () => {
    try {
      const response = await axios.post("/api/sharepoint/login", {
        tenantID,
        tenantName,
        clientID,
        appID,
      });
      console.log("access token", response);
      const accessToken = `${response.data.accessToken}`;
      return accessToken;
    } catch (error) {
      console.error("Failed to get access token:", error);
      throw error;
    }
  };
  const accessToken = await getAccessToken();
  const sharepointClient = axios.create({
    baseURL: `https://${tenantName}.sharepoint.com/sites/${siteName}/_api/web/`,
    headers: {
      Accept: "application/json; odata=nometadata",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    createDirectory: createDirectory(sharepointClient, baseUploadDirectory),
    uploadFile: uploadFile(sharepointClient, baseUploadDirectory),
    listSharedFolderContents: listSharedFolderContents(
      sharepointClient,
      baseUploadDirectory,
    ),
  };
};
