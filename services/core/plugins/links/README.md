# Links

## fields

- `id`
- `ownerId` -> `authorId`
- `slug` -> `data.slug`
- `linkType` -> `data.linkType`
- `name` -> `label`
- `destination` -> `data.destination`
- `content` -> `data.content`
- `assetId`
- `createdData`
- `updatedDate`
- `metadata` 
- `platformData`

### when adding

### asset

- assetType
- asset
- price

## Link types

- `asset`
- `embed`
- `link-list`
- `content`
- `redirect`

## Templates

- Notion page

| template name | linkType | requires    | other fields    |
| ------------- | -------- | ----------- | --------------- |
| Notion page   | embed    | destination | other fields    |
| e-book        | asset    | assetId     | assetType:ebook |
| template name | linkType | requires    | other fields    |

## Customization

- Styles
-
