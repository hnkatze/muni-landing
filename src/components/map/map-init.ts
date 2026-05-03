import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapPoint, MapCategory } from '../../types/map';
import { CATEGORY_LABELS, CATEGORY_COLORS, HASH_TO_CATEGORY } from '../../types/map';

// ── Category icon SVG paths (inline SVG for DivIcon) ────────────────────────

const CATEGORY_ICON_SVG: Record<MapCategory, string> = {
  'oficinas-municipales':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />',
  'escuelas':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.63 48.63 0 0 1 12 20.904a48.63 48.63 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />',
  'centros-salud':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
  'parques-mercados':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />',
  'atractivos-turisticos':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M6.115 5.19 3 17.345l3.693-1.385a4.492 4.492 0 0 1 3.194-.08l2.226.757a4.491 4.491 0 0 0 3.194-.08L18 15.245l-3.115-10.055a1.5 1.5 0 0 0-1.898-.974l-5.974 1.851a1.5 1.5 0 0 0-.898 1.123Z" />',
  'barrios-aldeas':
    '<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />',
};

// ── DivIcon factory ──────────────────────────────────────────────────────────

function createMarkerIcon(category: MapCategory): L.DivIcon {
  const color = CATEGORY_COLORS[category];
  const svg = CATEGORY_ICON_SVG[category];
  return L.divIcon({
    html: `
      <div style="background:${color.hex};width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">
        <svg style="transform:rotate(45deg);width:16px;height:16px;color:white;stroke:white" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" aria-hidden="true">
          ${svg}
        </svg>
      </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -36],
  });
}

// ── Popup content factory ────────────────────────────────────────────────────

function buildPopup(point: MapPoint): string {
  const color = CATEGORY_COLORS[point.category];
  const label = CATEGORY_LABELS[point.category];

  const phone = point.phone
    ? `<p class="map-popup-row">📞 <a href="tel:${point.phone}" style="color:#2E86C1">${point.phone}</a></p>`
    : '';
  const hours = point.hours
    ? `<p class="map-popup-row">🕐 ${point.hours}</p>`
    : '';
  const address = point.address
    ? `<p class="map-popup-row">📍 ${point.address}</p>`
    : '';

  return `
    <div style="min-width:180px;max-width:240px;font-family:'DM Sans',sans-serif">
      <span style="display:inline-block;background:${color.hex};color:white;border-radius:9999px;padding:1px 8px;font-size:11px;font-weight:500;margin-bottom:6px">${label}</span>
      <h4 style="font-size:13px;font-weight:600;color:#1C2B3A;margin:0 0 6px 0;line-height:1.3">${point.name}</h4>
      ${point.description ? `<p style="font-size:12px;color:#5A6B7D;margin:0 0 6px 0;line-height:1.4">${point.description}</p>` : ''}
      ${address}${phone}${hours}
      <a href="#point-${point.id}" style="display:inline-block;margin-top:6px;font-size:12px;color:#2E86C1;font-weight:500">Ver en la lista ↓</a>
    </div>`;
}

// ── Main init function ───────────────────────────────────────────────────────

export function initMap(container: HTMLElement): void {
  // Parse seed data from data attribute
  const raw = container.dataset.points ?? '[]';
  let points: MapPoint[] = [];
  try {
    points = JSON.parse(raw) as MapPoint[];
  } catch {
    console.error('[map-init] Failed to parse data-points attribute');
  }

  // Initialize Leaflet map
  const map = L.map(container, {
    center: [15.747876, -85.737224],
    zoom: 14,
    zoomControl: true,
  });

  // OSM tile layer — attribution required by OSM license
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Build per-category LayerGroups
  const categories = [
    'oficinas-municipales',
    'escuelas',
    'centros-salud',
    'parques-mercados',
    'atractivos-turisticos',
    'barrios-aldeas',
  ] as const satisfies readonly MapCategory[];

  const layers: Record<MapCategory, L.LayerGroup> = {} as Record<MapCategory, L.LayerGroup>;
  for (const cat of categories) {
    layers[cat] = L.layerGroup();
  }

  // Add markers to layers
  for (const point of points) {
    const icon = createMarkerIcon(point.category);
    const marker = L.marker(point.coords, { icon, title: point.name });
    marker.bindPopup(buildPopup(point), { maxWidth: 260 });
    layers[point.category].addLayer(marker);
  }

  // Add all layers to map initially
  for (const cat of categories) {
    layers[cat].addTo(map);
  }

  // ── Filter logic ─────────────────────────────────────────────────────────

  function applyFilter(active: MapCategory | 'all'): void {
    for (const cat of categories) {
      if (active === 'all' || active === cat) {
        if (!map.hasLayer(layers[cat])) layers[cat].addTo(map);
      } else {
        if (map.hasLayer(layers[cat])) map.removeLayer(layers[cat]);
      }
    }

    // Sync aria-pressed on filter chips
    document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((btn) => {
      const filter = btn.dataset.filter ?? '';
      const pressed = filter === active || (active === 'all' && filter === 'all');
      btn.setAttribute('aria-pressed', String(pressed));
    });

    // Sync list fallback visibility
    document.querySelectorAll<HTMLElement>('[data-location-group]').forEach((group) => {
      const groupCat = group.dataset.locationGroup ?? '';
      if (active === 'all' || groupCat === active) {
        group.removeAttribute('hidden');
      } else {
        group.setAttribute('hidden', '');
      }
    });
  }

  // ── Hash-based filter on load ─────────────────────────────────────────────

  function readHashFilter(): MapCategory | 'all' {
    const hash = window.location.hash.replace('#', '');
    return HASH_TO_CATEGORY[hash] ?? 'all';
  }

  applyFilter(readHashFilter());

  // Listen to hash changes (browser back/forward or external deep-links)
  window.addEventListener('hashchange', () => {
    applyFilter(readHashFilter());
  });

  // ── Filter chip click handler ─────────────────────────────────────────────

  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter as MapCategory | 'all';
      const hash = btn.dataset.hash ?? '';

      // Update URL hash without triggering hashchange loop
      if (filter === 'all') {
        history.pushState(null, '', window.location.pathname);
      } else {
        history.pushState(null, '', `#${hash}`);
      }

      applyFilter(filter);
    });
  });
}
