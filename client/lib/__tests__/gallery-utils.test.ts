import { describe, expect, it } from "bun:test";
import {
  clampGalleryIndex,
  filterAlbumsByCategory,
} from "@/lib/gallery-utils";
import type { GalleryAlbum } from "@/lib/types";

const sample: GalleryAlbum[] = [
  {
    id: "a",
    slug: "a",
    title: "A",
    category: "events",
    coverImage: { src: "/a.jpg", alt: "" },
    images: [],
  },
  {
    id: "b",
    slug: "b",
    title: "B",
    category: "general",
    coverImage: { src: "/b.jpg", alt: "" },
    images: [],
  },
];

describe("filterAlbumsByCategory", () => {
  it("returns all albums for all", () => {
    expect(filterAlbumsByCategory(sample, "all")).toEqual(sample);
  });

  it("filters by category", () => {
    expect(filterAlbumsByCategory(sample, "events")).toEqual([sample[0]]);
    expect(filterAlbumsByCategory(sample, "general")).toEqual([sample[1]]);
  });
});

describe("clampGalleryIndex", () => {
  it("clamps to bounds", () => {
    expect(clampGalleryIndex(-1, 3)).toBe(0);
    expect(clampGalleryIndex(5, 3)).toBe(2);
    expect(clampGalleryIndex(1, 3)).toBe(1);
  });

  it("returns 0 for empty", () => {
    expect(clampGalleryIndex(3, 0)).toBe(0);
  });

  it("supports stepping for lightbox navigation", () => {
    const len = 4;
    let index = 2;
    index = clampGalleryIndex(index + 1, len);
    expect(index).toBe(3);
    index = clampGalleryIndex(index + 1, len);
    expect(index).toBe(3);
    index = clampGalleryIndex(index - 1, len);
    expect(index).toBe(2);
    index = clampGalleryIndex(index - 10, len);
    expect(index).toBe(0);
  });
});
