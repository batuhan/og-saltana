import { ActionFunction } from "remix";
import { logout } from "~/utils/rootapi.server";
import { logout } from "~/utils/platformapi.server";
import { PlatformAction } from "~/utils/platforms.server";

type ActionData = {
  formError?: string;
  fieldErrors?: { actionType: PlatformAction; platformId: string | undefined };
  fields?: { actionType: string; platformId: string };
};

function validateActionType(actionType: PlatformAction) {
  if (typeof actionType !== "string") {
    return `actionType is wrong`;
  }
}

function validatePlatformId(platformId: string) {
  if (typeof platformId !== "string") {
    return `platformIds must be at least 5 characters long`;
  }
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const { actionType, platformId } = Object.fromEntries(
    await request.formData()
  );


  const fields = { actionType, platformId };
  const fieldErrors = {
    actionType: validateActionType(actionType as PlatformAction),
    platformId: validatePlatformId(platformId as string),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  return createRootSession(url, systemKey, '/root');
};
