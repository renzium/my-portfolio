// src/components/WorkDetail.jsx
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Cpu, Network, Code2, ShieldAlert } from "lucide-react";

const PROJECT_STUDIES = {
  nyxidiom: {
    title: "Nyxidiom Client-State & Edge Orchestration Infrastructure",
    subtitle: "High-throughput cloud deployments, distributed state architecture, and micro-frontend performance tuning.",
    role: "Senior Full-Stack & Systems Engineer",
    duration: "Production Integration",
    tags: ["React", "TypeScript", "Node.js", "AWS", "Next.js", "GraphQL"],
    metrics: [
      { label: "Core Web Vitals", value: "+42%", desc: "Improvement in LCP & TBT across core modules" },
      { label: "Deployment Pipeline", value: "<4.5m", desc: "Automated container builds using micro-bundle strategies" },
      { label: "Concurrency Peak", value: "10k+", desc: "Concurrent state synchronization events handled smoothly" }
    ],
    challenge: "Enterprise clients required highly interactive web platforms to manage real-time operational flows. The underlying client systems suffered from component-rendering lag during heavy data-socket pushes, paired with prolonged continuous integration deployment bottlenecks that slowed development velocity.",
    topology: [
      "View Orchestration Layer: Clean, atomic React & Next.js layouts configured under strict modular boundaries.",
      "State Management Bus: Local state mutations processed sequentially via a centralized event channel to prevent atomic re-render cycles.",
      "Edge Infrastructure Layer: Static optimization using custom asset streaming nodes distributed over AWS CloudFront edge networks.",
      "API Layer: Clean, optimized TypeScript GraphQL servers processing complex data structures asynchronously."
    ],
    tradeoffs: [
      {
        decision: "Incremental Static Regeneration (ISR) vs Server-Side Rendering (SSR)",
        reason: "SSR introduced a 350ms initial latency hit. By leveraging Next.js ISR pipelines coupled with progressive hydration on the client, we delivered instant initial document loads while dynamic telemetry states rendered in milliseconds post-load."
      },
      {
        decision: "Centralized Micro-Bundles vs Giant Monolith Core",
        reason: "Separating large dependency chains into tree-shaken, lazy-loaded components cut initial JS payload sizes in half, resolving CPU parsing blockages on weaker client devices."
      }
    ],
    codeSnippet: `// Optimized non-blocking react event reconciliation queue
export class RenderOptimizer {
  private queue: Array<() => void> = [];
  private frameScheduled = false;

  public scheduleUpdate(updateFn: () => void) {
    this.queue.push(updateFn);
    if (!this.frameScheduled) {
      this.frameScheduled = true;
      requestAnimationFrame(() => this.flushQueue());
    }
  }

  private flushQueue() {
    // Process all updates in a single animation frame to avoid layout thrashing
    while (this.queue.length > 0) {
      const update = this.queue.shift();
      if (update) update();
    }
    this.frameScheduled = false;
  }
}`,
  },
  "sqe-holding": {
    title: "SQE Holding Payment Orchestration Engine",
    subtitle: "Multi-gateway payment routing, bulletproof transactional consistency, and high-throughput database tuning under concurrent write pressure.",
    role: "Backend & Payments Systems Engineer",
    duration: "Contract System Architecture Migration",
    tags: ["Node.js", "PostgreSQL", "TypeORM", "Docker", "Redis Cache", "Stripe · Paystack · Flutterwave"],
    metrics: [
      { label: "SQL Latency Reduction", value: "65%", desc: "Index and transaction optimization gains" },
      { label: "Lock Contention", value: "0%", desc: "Deadlocks eliminated using atomic transaction isolation" },
      { label: "Throughput Limit", value: "4.8k/s", desc: "Clean payment writes per second sustained" }
    ],
    challenge: "SQE Holding needed a payment system capable of routing transactions across multiple gateways (Stripe, Paystack, Flutterwave) while guaranteeing exactly-once settlement. Heavy write periods triggered database deadlocks and slow indexing queries, and the architecture had to prioritize data integrity while scaling to high throughput without dropping or duplicating a single transaction.",
    topology: [
      "Access Layer: API endpoints validating inbound payment requests and gateway webhooks using robust middleware primitives.",
      "Orchestration Layer: Provider-agnostic routing logic selecting the optimal gateway per transaction, with automatic failover and retry on provider timeouts.",
      "Caching Engine: Redis Key-Value cluster intercepting repeating, high-read balance and catalog queries.",
      "Database Layer: Multi-threaded PostgreSQL engine running optimized indexes under Read Committed transaction isolation rules.",
      "Worker Threads: Decoupled job queues running asynchronous settlement notifications and reconciliation jobs to external micro-services."
    ],
    tradeoffs: [
      {
        decision: "Prepared Statements vs Raw Dynamic Queries",
        reason: "Prepared statements allowed PostgreSQL to cache execution plans. When processing thousands of repetitive balance updates, this choice alone saved massive CPU processing cycles on the core database nodes."
      },
      {
        decision: "Idempotency Keys vs Relying on Gateway-Side Deduplication",
        reason: "Payment gateway webhooks can fire more than once for the same event. Enforcing idempotency keys at our own API boundary meant we never trusted a third party alone to prevent double-settlement — a critical requirement for financial correctness."
      },
      {
        decision: "Redis Cache-Aside Strategy vs Real-Time Direct DB Reads",
        reason: "By implementing an aggressive cache-aside pattern for heavy, non-volatile state queries, we protected our primary data cluster from resource exhaustion during payment spikes."
      }
    ],
    codeSnippet: `// High-concurrency safe atomic payment settlement pipeline
async function executeAtomicPaymentSettlement(db, senderId, receiverId, amount) {
  return await db.transaction(async (transactionalEntityManager) => {
    // Acquire explicit row-level locks using FOR UPDATE to bypass transaction race-conditions
    const sender = await transactionalEntityManager
      .createQueryBuilder(Account, "account")
      .setLock("pessimistic_write")
      .where("account.id = :id", { id: senderId })
      .getOne();

    if (sender.balance < amount) {
      throw new Error("Insufficient balance for settlement");
    }

    // Execute atomic balance shifting inside the protected boundary
    await transactionalEntityManager.decrement(Account, { id: senderId }, "balance", amount);
    await transactionalEntityManager.increment(Account, { id: receiverId }, "balance", amount);
  });
}`,
  },
  "ai-extraction": {
    title: "AI-Powered Invoice Extraction & Validation Pipeline",
    subtitle: "Asynchronous document processing pipeline using LLM-based extraction to automate structured data capture at scale.",
    role: "Backend & AI Systems Engineer",
    duration: "Production Integration",
    tags: ["Python", "FastAPI", "AWS Lambda", "OpenAI API", "PostgreSQL"],
    metrics: [
      { label: "Extraction Accuracy", value: "98%", desc: "Field-level accuracy across structured document types" },
      { label: "Turnaround Time", value: "-70%", desc: "Reduction versus prior manual processing workflow" },
      { label: "Weekly Volume", value: "1,000+", desc: "Secure documents processed per week" }
    ],
    challenge: "Manual invoice processing was slow, error-prone, and could not scale with document volume. The goal was to build a system that could ingest unstructured invoices in varying formats, extract structured fields with high accuracy, and validate the output automatically — without a human reviewing every document.",
    topology: [
      "Ingestion Layer: Secure document upload endpoints accepting PDFs and images, queued for asynchronous processing.",
      "Extraction Layer: FastAPI service orchestrating calls to OpenAI's API for field-level extraction (vendor, amount, line items, dates) from unstructured document text.",
      "Validation Layer: Rule-based post-processing that cross-checks extracted fields against expected formats and flags low-confidence results for review.",
      "Storage Layer: Structured output persisted to PostgreSQL, with AWS Lambda handling the asynchronous ETL orchestration end-to-end."
    ],
    tradeoffs: [
      {
        decision: "LLM-Based Extraction vs Traditional OCR + Regex Rules",
        reason: "Regex-based extraction broke down every time a vendor changed invoice layout. Using an LLM to interpret document text semantically meant new formats worked out-of-the-box, cutting rule-maintenance overhead almost entirely."
      },
      {
        decision: "Asynchronous Lambda-Triggered Pipeline vs Synchronous Request/Response",
        reason: "Extraction latency varied per document, so blocking API calls would have created timeouts under load. Moving to an event-driven Lambda pipeline let documents queue and process independently, which is what delivered the 70% turnaround improvement."
      }
    ],
    codeSnippet: `# Async invoice extraction handler triggered by document upload events
async def process_invoice_document(event, context):
    document = fetch_document_from_queue(event["document_id"])
    raw_text = extract_text_from_document(document)

    # Delegate field-level extraction to the LLM instead of brittle regex rules
    extracted_fields = await extract_structured_fields(raw_text)

    if validate_extraction_confidence(extracted_fields):
        await persist_to_postgres(extracted_fields)
    else:
        await flag_for_manual_review(document["id"], extracted_fields)

    return {"status": "processed", "document_id": document["id"]}`,
  },
  aquaculture: {
    title: "IoT-Enabled Aquaculture Telemetry & Control Node",
    subtitle: "Automated environmental feedback loops & real-time telemetry pipelines.",
    role: "Lead Systems & Firmware Engineer",
    duration: "Academic Final Year Project",
    tags: ["C++", "ESP32", "Firebase RTDB", "Control Theory", "Embedded Systems"],
    metrics: [
      { label: "Latency", value: "<180ms", desc: "Sensor-to-UI replication over standard cellular" },
      { label: "Power Save", value: "35%", desc: "Efficiency gain using light-sleep state cycles" },
      { label: "Uptime", value: "99.9%", desc: "Continuous loop execution during network drops" }
    ],
    challenge: "Aquaculture environments require precise, real-time chemistry adjustments. Standard solutions relied on expensive, high-power industrial PLCs. The goal was to build an ultra-low-cost, highly responsive, edge-computed node that could autonomously monitor parameters and trigger physical actuator relays without relying on a constant cloud connection.",
    topology: [
      "Edge Layer: ESP32 microcontroller reading analog/digital sensors (pH, temperature, dissolved oxygen) using non-blocking registers.",
      "Buffer & Filter: Firmware implements a rolling-average digital filter to eliminate high-frequency sensor noise before transmission.",
      "Transport Layer: Lightweight Firebase Realtime Database WebSockets stream delta-changes only, keeping payload overhead minimal.",
      "Client Layer: React-based dashboard displaying system health charts with optimistic UI updates for manual override controls."
    ],
    tradeoffs: [
      {
        decision: "Custom C++ State Machine vs RTOS Tasks",
        reason: "While FreeRTOS is native to ESP32, multi-tasking introduced unnecessary mutex overhead for our 3 core sensors. Writing a custom, non-blocking cooperative scheduler loop minimized RAM usage and eliminated race conditions on the ADC."
      },
      {
        decision: "WebSockets (Firebase) vs MQTT Broker",
        reason: "MQTT is standard for IoT, but Firebase's native offline-first caching SDK on the React client allowed us to build robust sync mechanics with zero extra setup. Relays are triggered locally via hardware interrupts first, then synced to the cloud."
      }
    ],
    codeSnippet: `// Non-blocking sensor polling & hardware feedback loop
void loop() {
  unsigned long currentMillis = millis();
  
  // Poll sensors asynchronously without blocking the main event loop
  if (currentMillis - lastSensorRead >= SENSOR_INTERVAL) {
    lastSensorRead = currentMillis;
    float phReading = readFilteredPH();
    
    // Edge-computed safety shutdown: acts instantly, cloud sync is secondary
    if (phReading < CRITICAL_LOW_PH || phReading > CRITICAL_HIGH_PH) {
      triggerEmergencyDosingRelay();
    }
  }
  
  // Keep streaming socket alive & process outstanding writes
  handleDatabaseStreaming();
}`,
  }
};

export default function WorkDetail() {
  const { id } = useParams();
  const project = PROJECT_STUDIES[id];

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-40 text-center">
        <h1 className="text-2xl font-medium">Case Study Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested project architecture document does not exist.</p>
        <Link to="/works" className="mt-6 inline-block text-sm text-[--emerald] hover:underline">Back to Works</Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-6 pt-36 pb-32">
      <Link to="/works" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-12 group transition-colors">
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> 
        Back to Architectural Works
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(t => (
            <span key={t} className="rounded-md bg-secondary/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/30">{t}</span>
          ))}
        </div>
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">{project.title}</h1>
        <p className="text-lg text-muted-foreground font-light max-w-2xl">{project.subtitle}</p>
        
        <div className="flex gap-10 pt-4 text-xs text-muted-foreground border-b border-border/60 pb-8">
          <div><p className="font-semibold text-foreground">Role</p><p>{project.role}</p></div>
          <div><p className="font-semibold text-foreground">Timeline</p><p>{project.duration}</p></div>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
        {project.metrics.map((m, i) => (
          <div key={i} className="border border-border/60 bg-card/25 rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{m.label}</p>
            <p className="text-3xl font-semibold text-[--emerald] my-1">{m.value}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </section>

      {/* Narrative & Deep Dive */}
      <div className="space-y-12 text-sm md:text-base leading-relaxed text-muted-foreground">
        
        {/* Challenge */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
            <ShieldAlert size={18} className="text-[--emerald]" /> Core Challenge & Constraints
          </h2>
          <p>{project.challenge}</p>
        </section>

        {/* System Topology */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Network size={18} className="text-[--emerald]" /> System Topology
          </h2>
          <ol className="space-y-2 list-decimal list-inside bg-card/10 border border-border/40 rounded-xl p-5 text-sm">
            {project.topology.map((step, i) => (
              <li key={i} className="pl-2"><span className="text-foreground">{step.split(':')[0]}:</span>{step.split(':')[1]}</li>
            ))}
          </ol>
        </section>

        {/* Engineering Tradeoffs */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Cpu size={18} className="text-[--emerald]" /> Architecture & Tradeoff Decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.tradeoffs.map((t, i) => (
              <div key={i} className="border border-border/40 rounded-xl p-5 bg-card/5">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{t.decision}</h3>
                <p className="text-xs leading-relaxed">{t.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code deep-dive */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Code2 size={18} className="text-[--emerald]" /> Implementation Deep-Dive
          </h2>
          <pre className="overflow-x-auto rounded-xl border border-border/60 bg-muted/65 p-4 text-[11px] md:text-xs font-mono text-foreground leading-relaxed">
            <code>{project.codeSnippet}</code>
          </pre>
        </section>

      </div>
    </article>
  );
}