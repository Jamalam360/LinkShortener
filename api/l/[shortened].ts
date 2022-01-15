import type { APIHandler } from "aleph/types.d.ts";
import { getFullLink } from "~/api/link/index.ts";

export const handler: APIHandler = async ({ response, router }) => {
  response.redirect(await getFullLink(router.params.shortened));
};
