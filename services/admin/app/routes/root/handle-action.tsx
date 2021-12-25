
type ActionData = {
  formError?: string;
  fieldErrors?: { url: string | undefined; systemKey: string | undefined };
  fields?: { url: string; systemKey: string };
};

export let action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  let { url, systemKey } = Object.fromEntries(
    await request.formData()
  );
  if (
    typeof url !== "string" ||
    typeof systemKey !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { url, systemKey };
  let fieldErrors = {
    url: validateUrl(url),
    systemKey: validateSystemKey(systemKey),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  return createRootSession(url, systemKey, '/root');
};
