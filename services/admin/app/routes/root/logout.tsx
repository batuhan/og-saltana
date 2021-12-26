import { ActionFunction } from "remix";
import { logout } from "~/utils/rootapi.server";

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => logout(request)
