const context = require.context('../src', true, /^^((?!(main)).)*\.js$/);

context.keys().forEach(context);
