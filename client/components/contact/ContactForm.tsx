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
import { resolveContactPageQuery } from "@/lib/contact-query";
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

function readContactQueryFromLocationSearch(search: string) {
  const params = new URLSearchParams(search);
  return resolveContactPageQuery({
    purpose: params.get("purpose") ?? undefined,
    churchSlug: params.get("churchSlug") ?? undefined,
    ministrySlug: params.get("ministrySlug") ?? undefined,
    eventSlug: params.get("eventSlug") ?? undefined,
    church: params.get("church") ?? undefined,
    ministry: params.get("ministry") ?? undefined,
    event: params.get("event") ?? undefined,
  });
}

function slugStateForUrl(
  purpose: ContactFormPurpose,
  churchSlug: string | undefined,
  ministrySlug: string | undefined,
  eventSlug: string | undefined,
  churchSlugUnresolved?: string,
  ministrySlugUnresolved?: string,
  eventSlugUnresolved?: string,
): ContactUrlSlugState {
  return {
    churchSlug:
      purpose === "churches"
        ? (churchSlug ?? churchSlugUnresolved)
        : undefined,
    ministrySlug:
      purpose === "ministries"
        ? (ministrySlug ?? ministrySlugUnresolved)
        : undefined,
    eventSlug:
      purpose === "events" ? (eventSlug ?? eventSlugUnresolved) : undefined,
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
    (
      nextPurpose: ContactFormPurpose,
      cs: string | undefined,
      ms: string | undefined,
      es: string | undefined,
      cu: string | undefined,
      mu: string | undefined,
      eu: string | undefined,
    ) => {
      replaceContactUrlFromState(
        pathname,
        nextPurpose,
        slugStateForUrl(nextPurpose, cs, ms, es, cu, mu, eu),
      );
    },
    [pathname],
  );

  useEffect(() => {
    pushUrl(
      initialPurpose,
      initialPurpose === "churches" ? initialChurchSlug : undefined,
      initialPurpose === "ministries" ? initialMinistrySlug : undefined,
      initialPurpose === "events" ? initialEventSlug : undefined,
      initialPurpose === "churches" ? initialChurchSlugUnresolved : undefined,
      initialPurpose === "ministries" ? initialMinistrySlugUnresolved : undefined,
      initialPurpose === "events" ? initialEventSlugUnresolved : undefined,
    );
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
      const q = readContactQueryFromLocationSearch(globalThis.location.search);
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
  }, []);

  useEffect(() => {
    if (state.message && !state.success) {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [state.message, state.success]);

  function handlePurposeChange(next: ContactFormPurpose) {
    if (next === purpose) {
      pushUrl(
        purpose,
        churchSlug,
        ministrySlug,
        eventSlug,
        churchSlugUnresolved,
        ministrySlugUnresolved,
        eventSlugUnresolved,
      );
      return;
    }

    const prevPurpose = purpose;
    const prevChurchSlug = churchSlug;
    const prevMinistrySlug = ministrySlug;
    const prevEventSlug = eventSlug;
    const prevChurchUnresolved = churchSlugUnresolved;
    const prevMinistryUnresolved = ministrySlugUnresolved;
    const prevEventUnresolved = eventSlugUnresolved;

    setPurpose(next);
    if (next !== "churches") {
      setChurchSlug(undefined);
      setChurchSlugUnresolved(undefined);
    }
    if (next !== "ministries") {
      setMinistrySlug(undefined);
      setMinistrySlugUnresolved(undefined);
    }
    if (next !== "events") {
      setEventSlug(undefined);
      setEventSlugUnresolved(undefined);
    }

    const urlChurch =
      next === "churches" && prevPurpose === "churches"
        ? (prevChurchSlug ?? prevChurchUnresolved)
        : undefined;
    const urlMinistry =
      next === "ministries" && prevPurpose === "ministries"
        ? (prevMinistrySlug ?? prevMinistryUnresolved)
        : undefined;
    const urlEvent =
      next === "events" && prevPurpose === "events"
        ? (prevEventSlug ?? prevEventUnresolved)
        : undefined;

    replaceContactUrlFromState(pathname, next, {
      churchSlug: urlChurch,
      ministrySlug: urlMinistry,
      eventSlug: urlEvent,
    });
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
          className="text-sm text-(--color-fg-secondary)"
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
          className="space-y-4 rounded border border-(--color-border-subtle) bg-(--color-bg-surface-subtle) p-4"
          aria-label="What you are contacting us about"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-fg-muted)">
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
                pushUrl(
                  purpose,
                  slug,
                  ministrySlug,
                  eventSlug,
                  undefined,
                  ministrySlugUnresolved,
                  eventSlugUnresolved,
                );
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
                pushUrl(
                  purpose,
                  churchSlug,
                  slug,
                  eventSlug,
                  churchSlugUnresolved,
                  undefined,
                  eventSlugUnresolved,
                );
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
                pushUrl(
                  purpose,
                  churchSlug,
                  ministrySlug,
                  slug,
                  churchSlugUnresolved,
                  ministrySlugUnresolved,
                  undefined,
                );
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
              className="border border-(--color-border-subtle) bg-(--color-bg-surface-subtle) px-4 py-3 text-sm text-(--color-fg-primary)"
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
