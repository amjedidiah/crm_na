"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { submitContactAction } from "@/app/contact/actions";
import ContactListingSelect from "@/components/contact/ContactListingSelect";
import ContactPurposeTabs from "@/components/contact/ContactPurposeTabs";
import ContactSuccessPanel from "@/components/contact/ContactSuccessPanel";
import FormField from "@/components/contact/FormField";
import SubmitButton from "@/components/contact/SubmitButton";
import SuccessMessage from "@/components/contact/SuccessMessage";
import {
  CONTACT_FORM_PURPOSES,
  contactPurposeLabel,
} from "@/lib/contact-purposes";
import { resolveContactPageQuery, type ContactListings } from "@/lib/contact-query";
import type { ContactSelectOption } from "@/lib/contact-select-options";
import { replaceContactUrlFromState } from "@/lib/contact-url";
import type { ContactUrlSlugState } from "@/lib/contact-url";
import { contactSchema } from "@/lib/schemas/contact";
import type { ContactFormPurpose } from "@/lib/types";

const initialState = {
  success: false,
  message: "",
};

const contactCoreFieldsSchema = contactSchema.pick({
  name: true,
  email: true,
  message: true,
});

export type ContactFormInitial = Readonly<{
  listings: ContactListings;
  churchSelectOptions: readonly ContactSelectOption[];
  ministrySelectOptions: readonly ContactSelectOption[];
  eventSelectOptions: readonly ContactSelectOption[];
  initialPurpose: ContactFormPurpose;
  initialChurchSlug?: string;
  initialMinistrySlug?: string;
  initialEventSlug?: string;
  initialChurchSlugUnresolved?: string;
  initialMinistrySlugUnresolved?: string;
  initialEventSlugUnresolved?: string;
}>;

const purposeSelectOptions: ContactSelectOption[] = CONTACT_FORM_PURPOSES.map(
  (p) => ({
    value: p,
    label: contactPurposeLabel(p),
  }),
);

function readContactQueryFromLocationSearch(
  search: string,
  listings: ContactListings,
) {
  const params = new URLSearchParams(search);
  return resolveContactPageQuery(
    {
      purpose: params.get("purpose") ?? undefined,
      churchSlug: params.get("churchSlug") ?? undefined,
      ministrySlug: params.get("ministrySlug") ?? undefined,
      eventSlug: params.get("eventSlug") ?? undefined,
      church: params.get("church") ?? undefined,
      ministry: params.get("ministry") ?? undefined,
      event: params.get("event") ?? undefined,
    },
    listings,
  );
}

function slugStateForUrl(
  purpose: ContactFormPurpose,
  slugs: ContactFormSlugState,
): ContactUrlSlugState {
  return {
    churchSlug:
      purpose === "churches"
        ? (slugs.churchSlug ?? slugs.churchSlugUnresolved)
        : undefined,
    ministrySlug:
      purpose === "ministries"
        ? (slugs.ministrySlug ?? slugs.ministrySlugUnresolved)
        : undefined,
    eventSlug:
      purpose === "events"
        ? (slugs.eventSlug ?? slugs.eventSlugUnresolved)
        : undefined,
  };
}

type ContactFormSlugState = {
  churchSlug?: string;
  ministrySlug?: string;
  eventSlug?: string;
  churchSlugUnresolved?: string;
  ministrySlugUnresolved?: string;
  eventSlugUnresolved?: string;
};

function slugStateForPurpose(
  purpose: ContactFormPurpose,
  slugs: ContactFormSlugState,
): ContactFormSlugState {
  return {
    churchSlug: purpose === "churches" ? slugs.churchSlug : undefined,
    ministrySlug: purpose === "ministries" ? slugs.ministrySlug : undefined,
    eventSlug: purpose === "events" ? slugs.eventSlug : undefined,
    churchSlugUnresolved:
      purpose === "churches" ? slugs.churchSlugUnresolved : undefined,
    ministrySlugUnresolved:
      purpose === "ministries" ? slugs.ministrySlugUnresolved : undefined,
    eventSlugUnresolved:
      purpose === "events" ? slugs.eventSlugUnresolved : undefined,
  };
}

type PurposeSlugCarryInput = {
  nextPurpose: ContactFormPurpose;
  prevPurpose: ContactFormPurpose;
  purpose: ContactFormPurpose;
  slug?: string;
  unresolvedSlug?: string;
};

function carrySlugForPurposeChange({
  nextPurpose,
  prevPurpose,
  purpose,
  slug,
  unresolvedSlug,
}: PurposeSlugCarryInput): string | undefined {
  if (nextPurpose !== purpose || prevPurpose !== purpose) {
    return undefined;
  }
  return slug ?? unresolvedSlug;
}

function urlSlugsAfterPurposeChange(
  nextPurpose: ContactFormPurpose,
  prevPurpose: ContactFormPurpose,
  slugs: ContactFormSlugState,
): ContactUrlSlugState {
  return {
    churchSlug: carrySlugForPurposeChange({
      nextPurpose,
      prevPurpose,
      purpose: "churches",
      slug: slugs.churchSlug,
      unresolvedSlug: slugs.churchSlugUnresolved,
    }),
    ministrySlug: carrySlugForPurposeChange({
      nextPurpose,
      prevPurpose,
      purpose: "ministries",
      slug: slugs.ministrySlug,
      unresolvedSlug: slugs.ministrySlugUnresolved,
    }),
    eventSlug: carrySlugForPurposeChange({
      nextPurpose,
      prevPurpose,
      purpose: "events",
      slug: slugs.eventSlug,
      unresolvedSlug: slugs.eventSlugUnresolved,
    }),
  };
}

function firstIssueByPath(
  issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }>,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const iss of issues) {
    const key = iss.path[0];
    if (typeof key === "string" && !(key in map)) {
      map[key] = iss.message;
    }
  }
  return map;
}

function ContactFormInner({
  listings,
  churchSelectOptions,
  ministrySelectOptions,
  eventSelectOptions,
  initialPurpose,
  initialChurchSlug,
  initialMinistrySlug,
  initialEventSlug,
  initialChurchSlugUnresolved,
  initialMinistrySlugUnresolved,
  initialEventSlugUnresolved,
  onSendAnother,
}: ContactFormInitial & Readonly<{ onSendAnother: () => void }>) {
  const pathname = usePathname();
  const tabPanelId = "contact-form-panel";
  const purposeLabelId = "contact-purpose-label";
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    initialState,
  );

  const [purpose, setPurpose] = useState<ContactFormPurpose>(initialPurpose);
  const [churchSlug, setChurchSlug] = useState<string | undefined>(() =>
    initialPurpose === "churches" ? initialChurchSlug : undefined,
  );
  const [ministrySlug, setMinistrySlug] = useState<string | undefined>(() =>
    initialPurpose === "ministries" ? initialMinistrySlug : undefined,
  );
  const [eventSlug, setEventSlug] = useState<string | undefined>(() =>
    initialPurpose === "events" ? initialEventSlug : undefined,
  );
  const [churchSlugUnresolved, setChurchSlugUnresolved] = useState<
    string | undefined
  >(() =>
    initialPurpose === "churches" ? initialChurchSlugUnresolved : undefined,
  );
  const [ministrySlugUnresolved, setMinistrySlugUnresolved] = useState<
    string | undefined
  >(() =>
    initialPurpose === "ministries" ? initialMinistrySlugUnresolved : undefined,
  );
  const [eventSlugUnresolved, setEventSlugUnresolved] = useState<
    string | undefined
  >(() => (initialPurpose === "events" ? initialEventSlugUnresolved : undefined));

  const [clientSubmitBlocked, setClientSubmitBlocked] = useState(false);

  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactCoreFieldsSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", message: "" },
  });

  const nameVal = useWatch({ control, name: "name", defaultValue: "" });
  const emailVal = useWatch({ control, name: "email", defaultValue: "" });
  const messageVal = useWatch({ control, name: "message", defaultValue: "" });

  const liveIssueMap = useMemo(() => {
    const parsed = contactSchema.safeParse({
      name: nameVal ?? "",
      email: emailVal ?? "",
      message: messageVal ?? "",
      purpose,
      churchSlug: churchSlug || undefined,
      ministrySlug: ministrySlug || undefined,
      eventSlug: eventSlug || undefined,
    });
    if (parsed.success) return null;
    return firstIssueByPath(parsed.error.issues);
  }, [
    nameVal,
    emailVal,
    messageVal,
    purpose,
    churchSlug,
    ministrySlug,
    eventSlug,
  ]);

  const churchHint = useMemo(() => {
    if (!churchSlugUnresolved) return undefined;
    return `The link used “${churchSlugUnresolved}”, which is not in our directory. Pick a church below or leave this unset and describe it in your message.`;
  }, [churchSlugUnresolved]);

  const ministryHint = useMemo(() => {
    if (!ministrySlugUnresolved) return undefined;
    return `The link used “${ministrySlugUnresolved}”, which is not in our ministry list. Pick a ministry below or leave this unset and describe it in your message.`;
  }, [ministrySlugUnresolved]);

  const eventHint = useMemo(() => {
    if (!eventSlugUnresolved) return undefined;
    return `The link used “${eventSlugUnresolved}”, which is not on our events list. Pick an event below or leave this unset and describe it in your message.`;
  }, [eventSlugUnresolved]);

  const pushUrl = useCallback(
    (nextPurpose: ContactFormPurpose, slugs: ContactFormSlugState) => {
      replaceContactUrlFromState(
        pathname,
        nextPurpose,
        slugStateForUrl(nextPurpose, slugs),
      );
    },
    [pathname],
  );

  useEffect(() => {
    pushUrl(initialPurpose, {
      churchSlug: initialChurchSlug,
      ministrySlug: initialMinistrySlug,
      eventSlug: initialEventSlug,
      churchSlugUnresolved: initialChurchSlugUnresolved,
      ministrySlugUnresolved: initialMinistrySlugUnresolved,
      eventSlugUnresolved: initialEventSlugUnresolved,
    });
  }, [
    pathname,
    initialPurpose,
    initialChurchSlug,
    initialMinistrySlug,
    initialEventSlug,
    initialChurchSlugUnresolved,
    initialMinistrySlugUnresolved,
    initialEventSlugUnresolved,
    pushUrl,
  ]);

  useEffect(() => {
    function onPopState() {
      const q = readContactQueryFromLocationSearch(
        globalThis.location.search,
        listings,
      );
      setPurpose(q.purpose);
      setChurchSlug(q.churchSlug);
      setMinistrySlug(q.ministrySlug);
      setEventSlug(q.eventSlug);
      setChurchSlugUnresolved(q.churchSlugUnresolved);
      setMinistrySlugUnresolved(q.ministrySlugUnresolved);
      setEventSlugUnresolved(q.eventSlugUnresolved);
    }

    globalThis.addEventListener("popstate", onPopState);
    return () => {
      globalThis.removeEventListener("popstate", onPopState);
    };
  }, [listings]);

  useEffect(() => {
    if (state.message && !state.success) {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [state.message, state.success]);

  function handlePurposeChange(next: ContactFormPurpose) {
    const slugFields: ContactFormSlugState = {
      churchSlug,
      ministrySlug,
      eventSlug,
      churchSlugUnresolved,
      ministrySlugUnresolved,
      eventSlugUnresolved,
    };

    if (next === purpose) {
      pushUrl(purpose, slugFields);
      return;
    }

    const prevPurpose = purpose;
    const nextSlugState = slugStateForPurpose(next, slugFields);

    setPurpose(next);
    setChurchSlug(nextSlugState.churchSlug);
    setMinistrySlug(nextSlugState.ministrySlug);
    setEventSlug(nextSlugState.eventSlug);
    setChurchSlugUnresolved(nextSlugState.churchSlugUnresolved);
    setMinistrySlugUnresolved(nextSlugState.ministrySlugUnresolved);
    setEventSlugUnresolved(nextSlugState.eventSlugUnresolved);

    replaceContactUrlFromState(
      pathname,
      next,
      urlSlugsAfterPurposeChange(next, prevPurpose, slugFields),
    );
  }

  async function handleFormSubmit(
    e: { preventDefault(): void; currentTarget: HTMLFormElement },
  ) {
    e.preventDefault();
    const form = e.currentTarget;
    const okCore = await trigger();
    const fd = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      purpose: fd.get("purpose"),
      churchSlug: fd.get("churchSlug"),
      ministrySlug: fd.get("ministrySlug"),
      eventSlug: fd.get("eventSlug"),
    });

    if (!okCore || !parsed.success) {
      setClientSubmitBlocked(true);
      queueMicrotask(() => {
        feedbackRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
      return;
    }

    setClientSubmitBlocked(false);
    startTransition(() => {
      formAction(fd);
    });
  }

  const hasCoreFieldErrors = Boolean(
    errors.name?.message || errors.email?.message || errors.message?.message,
  );
  const showClientBanner =
    clientSubmitBlocked && (liveIssueMap !== null || hasCoreFieldErrors);

  const clientBannerMessages = useMemo(() => {
    if (!clientSubmitBlocked) return [];
    const fromZod =
      liveIssueMap === null
        ? []
        : [...new Set(Object.values(liveIssueMap))];
    const fromRhf = [
      errors.name?.message,
      errors.email?.message,
      errors.message?.message,
    ].filter(Boolean) as string[];
    return [...new Set([...fromRhf, ...fromZod])];
  }, [
    clientSubmitBlocked,
    liveIssueMap,
    errors.name?.message,
    errors.email?.message,
    errors.message?.message,
  ]);

  if (state.success && state.message) {
    return (
      <div className="card-surface p-6 sm:p-8">
        <ContactSuccessPanel message={state.message} onSendAnother={onSendAnother} />
      </div>
    );
  }

  return (
    <form
      className="card-surface grid gap-5 p-6"
      onSubmit={handleFormSubmit}
      noValidate
    >
      {purpose === "churches" ? null : (
        <input type="hidden" name="churchSlug" value="" />
      )}
      {purpose === "ministries" ? null : (
        <input type="hidden" name="ministrySlug" value="" />
      )}
      {purpose === "events" ? null : (
        <input type="hidden" name="eventSlug" value="" />
      )}

      <div className="grid gap-3">
        <span
          className="text-sm text-(--text-secondary)"
          id={purposeLabelId}
        >
          Purpose
        </span>
        <ContactPurposeTabs
          ariaLabelledBy={purposeLabelId}
          activePurpose={purpose}
          onPurposeChange={handlePurposeChange}
          tabPanelId={tabPanelId}
        />
      </div>

      <div
        id={tabPanelId}
        role="tabpanel"
        aria-labelledby={`contact-purpose-tab-${purpose}`}
        className="grid gap-5"
      >
        <div
          className="space-y-4 rounded border border-(--border-default) bg-(--surface-muted) p-4"
          aria-label="What you are contacting us about"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">
            Message details
          </p>
          <ContactListingSelect
            name="purpose"
            label="Purpose"
            value={purpose}
            options={purposeSelectOptions}
            error={liveIssueMap?.purpose}
            onChange={(v) => {
              handlePurposeChange(v as ContactFormPurpose);
            }}
          />
          {purpose === "churches" ? (
            <ContactListingSelect
              name="churchSlug"
              label="Church"
              value={churchSlug ?? ""}
              options={churchSelectOptions}
              hint={churchHint}
              error={liveIssueMap?.churchSlug}
              onChange={(next) => {
                const slug = next || undefined;
                setChurchSlug(slug);
                setChurchSlugUnresolved(undefined);
                pushUrl(purpose, {
                  churchSlug: slug,
                  ministrySlug,
                  eventSlug,
                  ministrySlugUnresolved,
                  eventSlugUnresolved,
                });
              }}
            />
          ) : null}
          {purpose === "ministries" ? (
            <ContactListingSelect
              name="ministrySlug"
              label="Ministry"
              value={ministrySlug ?? ""}
              options={ministrySelectOptions}
              hint={ministryHint}
              error={liveIssueMap?.ministrySlug}
              onChange={(next) => {
                const slug = next || undefined;
                setMinistrySlug(slug);
                setMinistrySlugUnresolved(undefined);
                pushUrl(purpose, {
                  churchSlug,
                  ministrySlug: slug,
                  eventSlug,
                  churchSlugUnresolved,
                  eventSlugUnresolved,
                });
              }}
            />
          ) : null}
          {purpose === "events" ? (
            <ContactListingSelect
              name="eventSlug"
              label="Event"
              value={eventSlug ?? ""}
              options={eventSelectOptions}
              hint={eventHint}
              error={liveIssueMap?.eventSlug}
              onChange={(next) => {
                const slug = next || undefined;
                setEventSlug(slug);
                setEventSlugUnresolved(undefined);
                pushUrl(purpose, {
                  churchSlug,
                  ministrySlug,
                  eventSlug: slug,
                  churchSlugUnresolved,
                  ministrySlugUnresolved,
                });
              }}
            />
          ) : null}
        </div>

        <FormField label="Name" error={errors.name?.message} {...register("name")} />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          label="Message"
          textarea
          error={errors.message?.message}
          {...register("message")}
        />

        <div ref={feedbackRef} className="scroll-mt-28 space-y-3">
          {state.message && !state.success ? (
            <SuccessMessage message={state.message} tone="error" />
          ) : null}
          {showClientBanner && clientBannerMessages.length > 0 ? (
            <div
              role="alert"
              className="border border-(--border-default) bg-(--surface-muted) px-4 py-3 text-sm text-(--text-primary)"
            >
              <span className="font-medium">Please review: </span>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {clientBannerMessages.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <SubmitButton pending={isPending} />
      </div>
    </form>
  );
}

function ContactForm(props: ContactFormInitial) {
  const [instance, setInstance] = useState(0);

  return (
    <ContactFormInner
      key={instance}
      {...props}
      onSendAnother={() => {
        setInstance((n) => n + 1);
      }}
    />
  );
}

export default ContactForm;
