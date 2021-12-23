
import {
  ActionFunction,
  HeadersFunction,
  Link,
  LinksFunction,
  MetaFunction,
} from "remix";
import { useActionData, Form } from "remix";
import { createRootSession } from "~/utils/rootapi.server";

export let meta: MetaFunction = () => {
  return {
    title: "SALTANA DEVOPS - Login",
  };
};

// export let links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: stylesUrl }];
// };

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24 * 30}`,
  };
};

function validateUrl(url: unknown) {
  if (typeof url !== "string" || url.length < 3) {
    return `urls must be at least 5 characters long`;
  }
}

function validateSystemKey(systemKey: unknown) {
  if (typeof systemKey !== "string" || systemKey.length < 3) {
    return `System keys must be at least 3 characters long`;
  }
}

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

export default function RootLogin() {
  const actionData = useActionData<ActionData | undefined>();

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Saltana DevOps Dashboard</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the Saltana  instance you want to manage along with the system key.
            <br />
            <br />
            Your network needs to be whitelisted by the instance you are connecting to.
          </p>

          <h3>THIS IS NOT THE NORMAL DASHBOARD. THIS IS FOR MANAGING THE DATABASE, PLATFORM SECRETS AND OTHER SCARY STUFF.</h3>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

            <Form
              method="post"
              className="space-y-6"
              aria-describedby={
                actionData?.formError ? "form-error-message" : undefined
              }
            >
              <div>
                <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
                  Server URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="url-input"
                    name="url"
                    defaultValue={actionData?.fields?.url}
                    aria-invalid={Boolean(actionData?.fieldErrors?.url)}
                    aria-describedby={
                      actionData?.fieldErrors?.url ? "url-error" : undefined
                    }
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                  />
                  {actionData?.fieldErrors?.url ? (
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="url-error"
                    >
                      {actionData.fieldErrors.url}
                    </p>
                  ) : null}

                </div>
              </div>

              <div>
                <label htmlFor="systemKey-input" className="block text-sm font-medium text-gray-700">
                  System Key
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    id="systemKey-input"
                    name="systemKey"
                    defaultValue={actionData?.fields?.systemKey}
                    aria-invalid={Boolean(actionData?.fieldErrors?.systemKey)}
                    aria-describedby={
                      actionData?.fieldErrors?.systemKey ? "systemKey-error" : undefined
                    }

                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  {actionData?.fieldErrors?.systemKey ? (
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="systemKey-error"
                    >
                      {actionData.fieldErrors.systemKey}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="i-know-what-iam-doing"
                    name="i-know-what-iam-doing"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="i-know-what-iam-doing" className="ml-2 block text-2xl text-gray-900">
                    I KNOW THIS PAGE IS FOR DEVOPS PURPOSES ONLY AND CAN DESTROY ALL DATABASES
                  </label>
                </div>

              </div>
              <div id="form-error-message">
                {actionData?.formError ? (
                  <p className="form-validation-error" role="alert">
                    {actionData.formError}
                  </p>
                ) : null}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Connect
                </button>
              </div>
            </Form>

          </div>
        </div>
      </div>
    </>
  )
}
