const metas = import.meta.glob('/sketches/*/meta.js', { eager: true });

const cards = Object.entries(metas)
  .map(([path, mod]) => {
    const slug = path.match(/\/sketches\/([^/]+)\//)[1];
    return { slug, ...mod.default };
  })
  .filter(({ slug }) => !slug.startsWith('_'))
  .sort((a, b) => a.slug.localeCompare(b.slug));

const gallery = document.getElementById('gallery');

if (cards.length > 0) gallery.innerHTML = cards
  .map(
    ({ slug, title, description }) => `
    <a class="card" href="/sketches/${slug}/">
      <h2>${title ?? slug}</h2>
      ${description ? `<p>${description}</p>` : ''}
    </a>`
  )
  .join('');
