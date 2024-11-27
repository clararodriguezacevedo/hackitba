import {init, register} from 'svelte-i18n';

register('en', () => import('./en.json'));
register('es', () => import('./es.json'));

register('en', async () => {
    const en = await import('./en.json');
    console.log('Loaded English translations:', en); // Debug log
    return en;
  });

init({
  fallbackLocale: 'es',
  initialLocale: 'en',
});
