import { ChevronLeft, ChevronRight, Heart, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.4;

export interface Product {
  id: number;
  name: string;
  price?: number;
  originalPrice?: number;
  size: string;
  era: string;
  condition: string;
  image: string;
  images?: string[];
  imageFit?: "cover" | "contain";
  imageBackground?: string;
  category: string;
  brand: string;
  color?: string;
  collection?: string;
  fabric?: string;
  material?: string;
  hardware?: string;
  serialNumber?: string;
  senserId?: string;
  brandId?: string;
  composition?: string;
  description?: string;
  measurements?: Record<string, string | undefined>;
  details?: string[];
  availableSoon?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  inCart?: boolean;
}

const FONT = "'Urbanist', sans-serif";
const formatMeasurementLabel = (label: string) =>
  label.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

const resolveImageSrc = (src: string) =>
  src.startsWith("http")
    ? `${src}${src.includes("?") ? "&" : "?"}w=480&h=640&fit=max&auto=format`
    : src;

export function ProductCard({ product, onAddToCart, inCart }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const zoomStageRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const hasPrice = typeof product.price === "number";
  const availableSoon = Boolean(product.availableSoon);
  const canAddToBag = hasPrice && !availableSoon;
  const priceLabel = hasPrice ? `$${product.price!.toLocaleString()}` : "Price TBD";
  const bagLabel = availableSoon
    ? "Available Soon"
    : !hasPrice
      ? "Price TBD"
      : inCart
        ? "Added to Bag"
        : "Add to Bag";
  const gallery = (product.images && product.images.length > 0 ? product.images : [product.image]).map(resolveImageSrc);
  const imageSrc = resolveImageSrc(product.image);
  const activeGallerySrc = gallery[galleryIndex] ?? imageSrc;
  const imageFit = product.imageFit ?? "contain";
  const imageBackground = product.imageBackground ?? "#FFFFFF";
  const isDarkFrame = imageBackground.toLowerCase() === "#000" || imageBackground.toLowerCase() === "#000000" || imageBackground.toLowerCase() === "black";
  const isZoomed = zoom > MIN_ZOOM;

  const hasGallery = gallery.length > 1;

  const resetZoom = () => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    dragRef.current = null;
  };

  const openLightbox = () => {
    resetZoom();
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    resetZoom();
  };

  const closeDetails = () => {
    setLightboxOpen(false);
    setDetailsOpen(false);
    resetZoom();
  };

  const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

  const showPrevPhoto = (e: MouseEvent) => {
    e.stopPropagation();
    setGalleryIndex((current) => (current - 1 + gallery.length) % gallery.length);
  };

  const showNextPhoto = (e: MouseEvent) => {
    e.stopPropagation();
    setGalleryIndex((current) => (current + 1) % gallery.length);
  };

  const zoomBy = (delta: number) => {
    setZoom((current) => {
      const next = clampZoom(Number((current + delta).toFixed(2)));
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleLightboxDoubleClick = () => {
    if (isZoomed) resetZoom();
    else setZoom(2.25);
  };

  const handleImagePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };

  const handleImagePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    setPan({
      x: drag.originX + (e.clientX - drag.startX),
      y: drag.originY + (e.clientY - drag.startY),
    });
  };

  const handleImagePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
  };

  useEffect(() => {
    if (!detailsOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [detailsOpen]);

  useEffect(() => {
    resetZoom();
  }, [galleryIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const stage = zoomStageRef.current;
    if (!stage) return;

    const onWheel = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      zoomBy(e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeLightbox();
      } else if (e.key === "ArrowLeft" && hasGallery) {
        setGalleryIndex((current) => (current - 1 + gallery.length) % gallery.length);
      } else if (e.key === "ArrowRight" && hasGallery) {
        setGalleryIndex((current) => (current + 1) % gallery.length);
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, hasGallery, gallery.length]);

  return (
    <>
      <div
        className="group cursor-pointer"
        role="button"
        tabIndex={0}
        style={{ fontFamily: FONT }}
        onClick={() => setDetailsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDetailsOpen(true);
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4", backgroundColor: imageBackground }}
        >
          <img
            src={activeGallerySrc}
            alt={product.name}
            className="w-full h-full transition-transform duration-500"
            style={{
              objectFit: imageFit,
              objectPosition: "center",
              transform: hovered && imageFit === "cover" ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Wishlist */}
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-white transition-opacity duration-200"
            style={{ opacity: hovered || liked ? 1 : 0, border: "1px solid rgba(0,0,0,0.12)" }}
          >
            <Heart size={13} strokeWidth={1.8} fill={liked ? "#FF3EA5" : "none"} color={liked ? "#FF3EA5" : "#0D0D0D"} />
          </button>

          {hasGallery && (
            <>
              <button
                aria-label="Previous photo"
                onClick={showPrevPhoto}
                className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center bg-white transition-opacity duration-200"
                style={{
                  opacity: hovered ? 1 : 0.85,
                  border: "1px solid rgba(0,0,0,0.12)",
                  zIndex: 2,
                }}
              >
                <ChevronLeft size={14} strokeWidth={2} color="#0D0D0D" />
              </button>
              <button
                aria-label="Next photo"
                onClick={showNextPhoto}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center bg-white transition-opacity duration-200"
                style={{
                  opacity: hovered ? 1 : 0.85,
                  border: "1px solid rgba(0,0,0,0.12)",
                  zIndex: 2,
                }}
              >
                <ChevronRight size={14} strokeWidth={2} color="#0D0D0D" />
              </button>
              <div
                className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-1.5"
                style={{ zIndex: 2, pointerEvents: "none" }}
              >
                {gallery.map((_, index) => (
                  <span
                    key={`${product.id}-dot-${index}`}
                    style={{
                      width: index === galleryIndex ? "14px" : "5px",
                      height: "5px",
                      borderRadius: "999px",
                      backgroundColor: index === galleryIndex ? "#FAFA5A" : "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(0,0,0,0.25)",
                      transition: "width 0.15s ease",
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Add to bag — slides up on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-transform duration-300"
            style={{ transform: hovered ? "translateY(0)" : "translateY(100%)", zIndex: 3 }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              disabled={inCart || !canAddToBag}
              className="w-full py-3 transition-colors duration-150"
              style={{
                backgroundColor: inCart || !canAddToBag ? "#888888" : "#FAFA5A",
                color: "#0D0D0D",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: FONT,
                cursor: inCart || !canAddToBag ? "default" : "pointer",
              }}
            >
              {bagLabel}
            </button>
          </div>
        </div>

        {/* Text */}
        <div className="pt-2.5">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontWeight: 500, marginBottom: "2px" }}>
            {product.brand}
          </p>
          <p style={{ fontSize: "0.88rem", color: "#0D0D0D", fontWeight: 400, lineHeight: 1.35 }}>
            {product.name}
          </p>
          <p style={{ fontSize: "0.72rem", color: "#888888", marginTop: "2px" }}>
            {product.size} · {product.era}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0D0D0D" }}>{priceLabel}</span>
            {product.originalPrice && (
              <span style={{ fontSize: "0.78rem", color: "#aaa", textDecoration: "line-through" }}>${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {availableSoon && (
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", fontWeight: 600, marginTop: "4px" }}>
              Available Soon
            </p>
          )}
        </div>
      </div>

      {detailsOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", fontFamily: FONT }}
          onClick={closeDetails}
        >
          <div
            className="relative grid w-full max-w-4xl overflow-hidden bg-white md:grid-cols-2"
            style={{ height: "min(90vh, 760px)", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close product details"
              onClick={closeDetails}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center bg-white"
              style={{ border: "1px solid rgba(0,0,0,0.12)" }}
            >
              <X size={16} strokeWidth={1.8} />
            </button>

            <div className="flex flex-col gap-3" style={{ minHeight: 0, backgroundColor: imageBackground }}>
              <button
                type="button"
                aria-label="Open photo fullscreen"
                onClick={openLightbox}
                className="relative flex-1 min-h-0 overflow-hidden"
                style={{ cursor: "zoom-in", border: "none", padding: 0, background: "transparent" }}
              >
                <img
                  src={activeGallerySrc}
                  alt={product.name}
                  className="h-full w-full"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />
                <span
                  className="absolute bottom-3 left-3 px-2.5 py-1"
                  style={{
                    backgroundColor: isDarkFrame ? "rgba(255,255,255,0.92)" : "rgba(13,13,13,0.82)",
                    color: isDarkFrame ? "#0D0D0D" : "#FFFFFF",
                    fontSize: "0.58rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Tap to expand
                </span>
              </button>
              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-3 px-3" style={{ flexShrink: 0 }}>
                  {gallery.map((src, index) => (
                    <button
                      key={`${product.id}-gallery-${index}`}
                      onClick={() => setGalleryIndex(index)}
                      aria-label={`View photo ${index + 1}`}
                      className="shrink-0 overflow-hidden"
                      style={{
                        width: "56px",
                        height: "72px",
                        backgroundColor: imageBackground,
                        border: index === galleryIndex
                          ? `1.5px solid ${isDarkFrame ? "#FAFA5A" : "#0D0D0D"}`
                          : `1px solid ${isDarkFrame ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)"}`,
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full"
                        style={{ objectFit: "contain", objectPosition: "center" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="overflow-y-auto p-8 md:p-10"
              style={{ minHeight: 0, overscrollBehavior: "contain" }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888888", fontWeight: 600 }}>
                {product.brand}
              </p>
              <h2 style={{ marginTop: "8px", fontSize: "2rem", lineHeight: 1.05, fontWeight: 800, color: "#0D0D0D" }}>
                {product.name}
              </h2>
              <p style={{ marginTop: "12px", fontSize: "1.25rem", fontWeight: 700, color: "#0D0D0D" }}>
                {priceLabel}
              </p>
              {availableSoon && (
                <p style={{ marginTop: "6px", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontWeight: 700 }}>
                  Available Soon
                </p>
              )}

              <p style={{ marginTop: "14px", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", fontWeight: 600 }}>
                Includes Entrupy verification card
              </p>

              <dl className="mt-8 grid gap-4" style={{ fontSize: "0.86rem", color: "#0D0D0D" }}>
                <div>
                  <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Size</dt>
                  <dd className="mt-1">{product.size}</dd>
                </div>
                <div>
                  <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Era</dt>
                  <dd className="mt-1">{product.era}</dd>
                </div>
                <div>
                  <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Condition</dt>
                  <dd className="mt-1">{product.condition}</dd>
                </div>
                {product.color && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Color</dt>
                    <dd className="mt-1">{product.color}</dd>
                  </div>
                )}
                {product.fabric && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Fabric</dt>
                    <dd className="mt-1">{product.fabric}</dd>
                  </div>
                )}
                {product.material && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Material</dt>
                    <dd className="mt-1">{product.material}</dd>
                  </div>
                )}
                {product.hardware && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Hardware</dt>
                    <dd className="mt-1">{product.hardware}</dd>
                  </div>
                )}
                {product.serialNumber && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Serial Number</dt>
                    <dd className="mt-1">{product.serialNumber}</dd>
                  </div>
                )}
                {product.senserId && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Senser ID</dt>
                    <dd className="mt-1">{product.senserId}</dd>
                  </div>
                )}
                {product.brandId && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Brand ID</dt>
                    <dd className="mt-1">{product.brandId}</dd>
                  </div>
                )}
                {product.composition && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Composition</dt>
                    <dd className="mt-1">{product.composition}</dd>
                  </div>
                )}
                {product.collection && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Collection</dt>
                    <dd className="mt-1">{product.collection}</dd>
                  </div>
                )}
                {product.measurements && (
                  <div>
                    <dt style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Measurements</dt>
                    <dd className="mt-1">
                      {Object.entries(product.measurements)
                        .filter(([, value]) => value)
                        .map(([label, value]) => `${formatMeasurementLabel(label)} ${value}`)
                        .join(" · ")}
                    </dd>
                  </div>
                )}
              </dl>

              {product.description && (
                <div className="mt-8">
                  <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Description</p>
                  <p className="mt-3" style={{ fontSize: "0.86rem", color: "#0D0D0D", lineHeight: 1.65 }}>{product.description}</p>
                </div>
              )}

              {product.details && product.details.length > 0 && (
                <div className="mt-8">
                  <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontSize: "0.65rem", fontWeight: 700 }}>Details</p>
                  <ul className="mt-3 space-y-2" style={{ fontSize: "0.86rem", color: "#0D0D0D" }}>
                    {product.details.map((detail) => (
                      <li key={detail}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => onAddToCart(product)}
                disabled={inCart || !canAddToBag}
                className="mt-8 w-full py-3 transition-colors duration-150"
                style={{
                  backgroundColor: inCart || !canAddToBag ? "#888888" : "#FAFA5A",
                  color: "#0D0D0D",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  fontFamily: FONT,
                  cursor: inCart || !canAddToBag ? "default" : "pointer",
                }}
              >
                {bagLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[120] flex flex-col"
          style={{ backgroundColor: "rgba(0,0,0,0.94)", fontFamily: FONT }}
          onClick={closeLightbox}
        >
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => zoomBy(-ZOOM_STEP)}
              disabled={zoom <= MIN_ZOOM}
              className="flex h-10 w-10 items-center justify-center bg-white disabled:opacity-40"
            >
              <Minus size={16} strokeWidth={2} color="#0D0D0D" />
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => zoomBy(ZOOM_STEP)}
              disabled={zoom >= MAX_ZOOM}
              className="flex h-10 w-10 items-center justify-center bg-white disabled:opacity-40"
            >
              <Plus size={16} strokeWidth={2} color="#0D0D0D" />
            </button>
            <button
              type="button"
              aria-label="Close expanded photo"
              onClick={closeLightbox}
              className="flex h-10 w-10 items-center justify-center bg-white"
            >
              <X size={18} strokeWidth={1.8} color="#0D0D0D" />
            </button>
          </div>

          {hasGallery && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); setGalleryIndex((current) => (current - 1 + gallery.length) % gallery.length); }}
                className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white"
              >
                <ChevronLeft size={18} strokeWidth={2} color="#0D0D0D" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); setGalleryIndex((current) => (current + 1) % gallery.length); }}
                className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white"
              >
                <ChevronRight size={18} strokeWidth={2} color="#0D0D0D" />
              </button>
            </>
          )}

          <div
            ref={zoomStageRef}
            className="relative flex-1 min-h-0 overflow-hidden touch-none"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleLightboxDoubleClick}
            onPointerDown={handleImagePointerDown}
            onPointerMove={handleImagePointerMove}
            onPointerUp={handleImagePointerUp}
            onPointerCancel={handleImagePointerUp}
            style={{ cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
          >
            <img
              src={activeGallerySrc}
              alt={product.name}
              className="h-full w-full select-none"
              draggable={false}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.18s ease-out",
                transformOrigin: "center center",
                padding: "24px",
              }}
            />
          </div>

          <p
            className="pb-5 text-center"
            style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
            onClick={(e) => e.stopPropagation()}
          >
            Scroll or use +/− to zoom · Drag to pan · Esc to close
          </p>
        </div>
      )}
    </>
  );
}
