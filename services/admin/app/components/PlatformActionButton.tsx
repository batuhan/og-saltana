import { useFetcher } from "remix";

function PlatformActionButton({ buttonName, platformId, }) {
  let cities = useFetcher();

  return (
    <cities.Form method="post" action="/root/handle-action">
      <Combobox aria-label="Cities">
        <div>
          <ComboboxInput
            name="q"
            onChange={event =>
              cities.submit(event.target.form)
            }
          />
          {cities.state === "submitting" && <Spinner />}
        </div>

        {cities.data && (
          <ComboboxPopover className="shadow-popup">
            {cities.data.error ? (
              <p>Failed to load cities :(</p>
            ) : cities.data.length ? (
              <ComboboxList>
                {cities.data.map(city => (
                  <ComboboxOption
                    key={city.id}
                    value={city.name}
                  />
                ))}
              </ComboboxList>
            ) : (
              <span>No results found</span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </cities.Form>
  );
}
