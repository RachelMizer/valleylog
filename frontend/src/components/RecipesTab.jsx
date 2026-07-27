import { useEffect, useState } from "react";
import { listRecipeProgress, upsertRecipeProgress } from "../api";
import KNOWN_RECIPES from "../data/recipes.json";
import DataTable from "./DataTable";

function parseNum(str) {
  if (!str) return 0;
  return Number(String(str).replace(/,/g, "")) || 0;
}

const MEAL_TYPES = [...new Set(KNOWN_RECIPES.map(r => r.mealType))];
const STAR_LEVELS = [5, 4, 3, 2, 1, 0];

export default function RecipesTab() {
  const [progressByName, setProgressByName] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState(() => new Set(MEAL_TYPES));
  const [activeStars, setActiveStars] = useState(() => new Set(STAR_LEVELS));

  useEffect(() => {
    listRecipeProgress()
      .then(rows => {
        const map = {};
        rows.forEach(r => { map[r.name] = r.discovered; });
        setProgressByName(map);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleToggleDiscovered(name, discovered) {
    setProgressByName(m => ({ ...m, [name]: discovered }));
    await upsertRecipeProgress(name, discovered);
  }

  function handleToggleType(type) {
    setActiveTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  function handleToggleStar(level) {
    setActiveStars(prev => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  }

  if (loading) return <p>Loading…</p>;

  const query = search.trim().toLowerCase();
  const filtered = KNOWN_RECIPES.filter(r =>
    activeTypes.has(r.mealType) &&
    activeStars.has(r.stars || 0) &&
    (r.name.toLowerCase().includes(query) ||
      r.mealType.toLowerCase().includes(query) ||
      r.ingredients.some(i => i.toLowerCase().includes(query)))
  );

  const columns = [
    {
      key: "image", label: "Dish",
      render: r => (r.image
        ? <img className="table-thumb" src={encodeURI(`/${r.image}`)} alt="" loading="lazy" />
        : ""),
    },
    {
      key: "name", label: "Name",
      sortValue: r => r.name.toLowerCase(),
      render: r => r.name,
    },
    {
      key: "mealType", label: "Meal Type",
      sortValue: r => r.mealType.toLowerCase(),
      render: r => r.mealType,
    },
    {
      key: "ingredients", label: "Ingredients", wrap: true,
      render: r => r.ingredients.join(", "),
    },
    {
      key: "stars", label: "Stars",
      sortValue: r => r.stars || 0,
      render: r => r.stars ? "★".repeat(r.stars) + "☆".repeat(5 - r.stars) : "—",
    },
    {
      key: "energy", label: "Energy",
      sortValue: r => parseNum(r.energy),
      render: r => r.energy ? `+${r.energy}` : "—",
    },
    {
      key: "sellPrice", label: "Sell Price",
      sortValue: r => parseNum(r.sellPrice),
      render: r => r.sellPrice || "—",
    },
    {
      key: "discovered", label: "Discovered",
      sortValue: r => (progressByName[r.name] ? 1 : 0),
      render: r => (
        <button
          type="button"
          className={`toggle-btn ${progressByName[r.name] ? "on" : ""}`}
          onClick={() => handleToggleDiscovered(r.name, !progressByName[r.name])}
        >
          {progressByName[r.name] ? "🔓 Discovered" : "🔒 Not Made Yet"}
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="panel-toolbar">
        <input
          type="search"
          placeholder="Search recipes, meal type, or ingredients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <span className="filter-label">Filters</span>
        {MEAL_TYPES.map(type => (
          <label key={type} className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeTypes.has(type)}
              onChange={() => handleToggleType(type)}
            />
            {type}
          </label>
        ))}
        <span className="filter-divider" />
        {STAR_LEVELS.map(level => (
          <label key={level} className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeStars.has(level)}
              onChange={() => handleToggleStar(level)}
            />
            {level === 0 ? "Unrated" : "★".repeat(level) + "☆".repeat(5 - level)}
          </label>
        ))}
        <span className="filter-actions">
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setActiveTypes(new Set(MEAL_TYPES));
              setActiveStars(new Set(STAR_LEVELS));
            }}
          >
            Select all
          </button>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setActiveTypes(new Set());
              setActiveStars(new Set());
            }}
          >
            Clear filters
          </button>
        </span>
      </div>
      <DataTable columns={columns} rows={filtered} getRowKey={r => r.name} />
    </div>
  );
}
