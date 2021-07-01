import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Base')
    .items([
      ...S.documentTypeListItems(),
      S.listItem()
        .title('Products')
        .child(
          S.documentTypeList('category')
            .title('By Category')
            .child((categoryId) => {
              return S.documentList()
                .title('Products')
                .filter(
                  `_type == 'product' && _id in *[_id == $categoryId][0].products[]._ref`
                )
                .params({ categoryId });
            })
        ),
    ]);
