"use client";

import { useMemo, useState } from "react";
import { Search, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/dashboard/badge";
import { Card } from "@/components/dashboard/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { DemoNoticeDialog } from "@/components/dashboard/demo-notice-dialog";
import {
  storeCategories,
  storeProducts,
  type StoreProduct,
} from "@/data/store";
import { cn } from "@/lib/utils";

function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{product.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {product.category}
          </p>
        </div>
        <Badge variant={product.tier === "Premium" ? "accent" : "success"}>
          {product.tier}
        </Badge>
      </div>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">
        {product.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-subtle-foreground">
        <span className="flex items-center gap-1">
          <Star
            className="size-3.5 fill-warning text-warning"
            aria-hidden="true"
          />
          {product.rating}
        </span>
        <span>{product.usageCount}</span>
      </div>
      <DemoNoticeDialog
        trigger={
          <Button variant="secondary" size="sm" className="mt-4">
            View
          </Button>
        }
        title={product.name}
        description={`${product.description} This is a demo product page — no real product exists behind this listing.`}
      />
    </Card>
  );
}

export function StoreView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<(typeof storeCategories)[number]>("All");
  const [sort, setSort] = useState<"rating" | "usage">("rating");

  const featured = storeProducts.filter((p) => p.featured);

  const filtered = useMemo(() => {
    const list = storeProducts.filter((p) => {
      const matchesQuery = p.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
    return [...list].sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : b.usageCount.localeCompare(a.usageCount),
    );
  }, [query, category, sort]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        title="Store"
        description="Discover AI tools, templates, prompts, and workflows."
      />
      <PageContainer className="max-w-5xl">
        {featured.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold">Featured</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
              aria-hidden="true"
            />
            <label htmlFor="store-search" className="sr-only">
              Search the store
            </label>
            <input
              id="store-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-full rounded-lg border border-border-strong bg-surface-2 pl-9 pr-3 text-base outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent sm:text-sm"
            />
          </div>
          <label htmlFor="store-sort" className="sr-only">
            Sort
          </label>
          <select
            id="store-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as "rating" | "usage")}
            className="h-10 rounded-lg border border-border-strong bg-surface-2 px-3 text-base sm:text-sm"
          >
            <option value="rating">Top rated</option>
            <option value="usage">Most used</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {storeCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none",
                category === cat
                  ? "border-accent bg-accent-soft text-foreground"
                  : "border-border-strong text-muted-foreground hover:bg-surface-2",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No products found"
            description="Try a different search term or category."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  );
}
