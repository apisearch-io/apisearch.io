This is the Apisearch item structure.

```json
{
    "id": "ID",
    "ti": "Title",
    "d": "Description",
    "b": "Brand",
    "p": "Price, 9.34 (float)",
    "op": "Old price, 13.47 (float)",
    "p_c": "Price with currency, 9.34€ (string)",
    "op_c": "Price with currency, 13.47€ (string)",
    "e": "Ean",
    "sku": "Sku",
    "u": "Url",
    "i": "Image",
    "wv": "Product has variants (boolean)",
    "iv": "Product is a variant (boolean)",
    "tg": ["tag1", "tag2", "tag3"],
    "c": "Category",
    "c1": "Category level 1",
    "c2": "Category level 2",
    "c3": "Category level 3",
    "c4": "Category level 4",
    "c5": "Category level 5",
    "o": "Options",
    "rs": "Review stars (integer)",
    "rc": "Number of reviews (integer)"
}
```

For multisite, you can work with both sites and languages. A site can hold a
language, and a language can be held by multiple sites. Fields `ID`,`title`,
`url` and `image` are required. Site and language names have no standard,
so you can choose your own codes.

```json
{
    "id": "ID",
    "ti": "Title",
    "u": "Url",
    "i": "Image",
    "languages": {
        "ca": {
            "ti": "Title in catalan",
            "d": "Description in catalan"
        },
        "es": {
            "ti": "Title in spanish",
            "d": "Description in spanish"
        }
    },
    "sites": {
        "site_in_cat": {
            "language": "ca",
            "p": 1.32,
            "p_c": "1.32 €",
            "op": 2.01,
            "op_c": "2.01 €"
        },
        "site_in_esp": {
            "language": "es",
            "p": 4.32,
            "p_c": "USD 4.32",
            "op": 5.01,
            "op_c": "USD 5.01"
        }
    }
}
```

Using languages is not a must, and should be used when some sites share the same
language. The main goal for languages is to reduce both the feed and the index
sizes.

```json
{
    "id": "ID",
    "ti": "Title",
    "u": "Url",
    "i": "Image",
    "sites": {
        "site_in_cat": {
            "ti": "Title in catalan",
            "d": "Description in catalan",
            "language": "ca",
            "p": 1.32,
            "p_c": "1.32 €",
            "op": 2.01,
            "op_c": "2.01 €"
        },
        "site_in_esp": {
            "ti": "Title in spanish",
            "d": "Description in spanish",
            "p": 4.32,
            "p_c": "USD 4.32",
            "op": 5.01,
            "op_c": "USD 5.01"
        }
    }
}
```

The feed will be served in [`JSONL`](https://jsonlines.org) format. As simple as
a file when you write a json representation of an item. Important. Each line must represent one item. This means that break lines must be encoded.
