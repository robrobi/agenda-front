if (typeof require.ensure !== 'function') { require.ensure = (d, c) => { c(require); }; }

if (typeof require.include !== 'function') { require.include = () => {}; }


export default function getRoutes(state) {
  return [
    {
      path: '/',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('views/components/home').default);
        });
      },
    },
  ];
}
