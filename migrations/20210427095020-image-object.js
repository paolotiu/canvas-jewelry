module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    const cursor = await db.collection('items').find();
    const items = await cursor.toArray();
    console.log(items);
    const operations = items.map(async (item) => {
      console.log(item.images);
      const imageObjects = item.images.map((url, i) => ({ url, public_id: item.imageIds[i] }));
      return db
        .collection('items')
        .updateOne({ _id: item._id }, { $set: { images: imageObjects } });
    });
    return Promise.all(operations);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
