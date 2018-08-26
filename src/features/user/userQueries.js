export const query = ({ auth, userUid }) => {
    if(userUid !== null){
        return [
            {
                collection: 'users',
                doc: userUid,
                storeAs: 'profile'

            },
            {
                collection: 'users',
                doc: userUid,
                subcollections: [{ collection: 'photos' }],
                storeAs: 'photos'
              }
        ]
    }
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  };