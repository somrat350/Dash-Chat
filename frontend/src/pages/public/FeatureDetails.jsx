import { useLayoutEffect, useMemo, useRef } from "react";
import { Link, Navigate, useParams } from "react-router";
import gsap from "gsap";
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  Video,
  Settings,
} from "lucide-react";
import {
  CHAT_FEATURES,
  getChatFeatureBySlug,
} from "../../constants/chatFeaturesData";

const iconByFeature = {
  "voice-call": Phone,
  "live-chat": MessageCircle,
  "video-call": Video,
  settings: Settings,
};

const FeatureDetails = () => {
  const { featureSlug } = useParams();
  const rootRef = useRef(null);

  const feature = useMemo(
    () => getChatFeatureBySlug(featureSlug),
    [featureSlug],
  );

  useLayoutEffect(() => {
    if (!feature) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-feature-hero]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65 },
      )
        .fromTo(
          "[data-capability-card]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.32",
        )
        .fromTo(
          "[data-feature-meta]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 },
          "-=0.25",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [feature]);

  if (!feature) {
    return <Navigate to="/features" replace />;
  }

  const Icon = iconByFeature[feature.slug] || MessageCircle;

  return (
    <section ref={rootRef} className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-10 h-64 w-64 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-1 py-6 sm:py-10">
        <div
          data-feature-hero
          className="opacity-0 rounded-3xl border border-base-300 bg-base-200/70 p-6 sm:p-8"
        >
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-base-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <Icon size={14} /> Dash-Chat Feature
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl font-black text-base-content">
                {feature.name}
              </h1>
              <p className="mt-3 text-base text-base-content/75 leading-relaxed">
                {feature.intro}
              </p>
            </div>

            <div
              className={`rounded-2xl bg-gradient-to-br ${feature.color} p-[1px] shadow-xl`}
            >
              <div className="rounded-2xl bg-base-100/95 p-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-base-200 flex items-center justify-center">
                  <img
                    src={feature.img}
                    alt={feature.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-base-content/60">
                    Snapshot
                  </p>
                  <p className="text-base font-semibold text-base-content">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {feature.capabilities.map((item) => (
            <article
              key={item.title}
              data-capability-card
              className="opacity-0 rounded-2xl border border-base-300 bg-base-100/80 p-5 shadow-sm"
            >
              <h3 className="text-lg font-bold text-base-content">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                {item.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5">
          <article
            data-feature-meta
            className="opacity-0 rounded-2xl border border-base-300 bg-base-100/80 p-5"
          >
            <h3 className="text-base font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" />
              Where You Can Use It
            </h3>
            <ul className="mt-3 space-y-2">
              {feature.appearsIn.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-base-200 px-3 py-2 text-sm text-base-content/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div
          data-feature-meta
          className="opacity-0 mt-8 rounded-2xl border border-primary/25 bg-primary/5 p-5"
        >
          <p className="text-sm sm:text-base text-base-content/75">
            This page is generated from your current Dash-Chat implementation,
            so each detail reflects features already present in your frontend
            and backend codebase.
          </p>
        </div>

        <div data-feature-meta className="opacity-0 mt-6 flex flex-wrap gap-3">
          {CHAT_FEATURES.filter((item) => item.slug !== feature.slug).map(
            (item) => (
              <Link
                key={item.slug}
                to={`/features/${item.slug}`}
                className="btn btn-sm btn-outline rounded-xl"
              >
                View {item.name}
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureDetails;
