// ── Citizen Smith — Stepper Logic ──

// ── Query-param routing ──
function getQueryParams() {
    const p = new URLSearchParams(window.location.search);
    return { sector: p.get('sector'), issue: p.get('issue') };
}

function setQueryParams(sector, issue) {
    const p = new URLSearchParams();
    if (sector) p.set('sector', sector);
    if (issue) p.set('issue', issue);
    const newUrl = p.toString() ? '?' + p.toString() : './';
    window.history.replaceState(null, '', newUrl);
}

const issueMap = {
    debt: [
        { value: 'dual-contact', label: 'More than one company is chasing me for the same debt' },
        { value: 'default-threat', label: 'They are threatening default even though I have disputed it' },
        { value: 'contradictory', label: 'They keep saying different things' },
        { value: 'vulnerability', label: 'They are ignoring my hardship, health, or personal situation' },
        { value: 'harassment', label: 'They keep calling, emailing, or pressuring me' },
        { value: 'breathing-space', label: 'I need time, breathing space, or a payment pause' },
        { value: 'statute-barred', label: 'They are chasing me for an old debt that may be too old to enforce' },
        { value: 'fraud', label: 'This debt is not mine or may have been caused by fraud' },
        { value: 'wrong-person', label: 'They have the wrong person' },
        { value: 'bereavement', label: 'This debt involves someone who has died' },
        { value: 'unaffordable-lending', label: 'They should never have lent me this money' },
        { value: 'unfair-fees', label: 'They keep adding fees or charges that feel unfair' },
        { value: 'invalid-default-notice', label: 'The default notice looks wrong or defective' },
        { value: 'prove-authority', label: 'I need proof of who actually owns or controls this debt' }
    ],
    housing: [
        { value: 'damp-mould', label: 'There is damp or mould in the property' },
        { value: 'no-heating', label: 'There is no heating or hot water' },
        { value: 'repairs', label: 'The landlord is not fixing serious repairs' },
        { value: 'disrepair-escalation', label: 'I have already reported it and they are still not fixing it' },
        { value: 'pests', label: 'There is a pest infestation in the property' }
    ],
    energy: [
        { value: 'billing', label: 'The bill is wrong or the charges make no sense' },
        { value: 'smart-meter', label: 'The smart meter is not working properly' },
        { value: 'prepayment-meter', label: 'They are threatening to force a prepayment meter or remote switch' },
        { value: 'direct-debit', label: 'They are taking too much by direct debit or refusing to refund credit' },
        { value: 'energy-debt', label: 'I am struggling with energy debt or need vulnerability support' }
    ],
    telecoms: [
        { value: 'billing', label: 'The bill is wrong or the charges are unfair' },
        { value: 'contract', label: 'They are arguing over my contract or cancellation' },
        { value: 'service-failure', label: 'The service is poor, broken, or keeps failing' },
        { value: 'late-notice', label: 'They are chasing me for an old telecoms bill that has just appeared' }
    ],
    benefits: [
        { value: 'pip-refusal', label: 'PIP has been refused, reduced, or stopped' },
        { value: 'esa-challenge', label: 'ESA has been refused or placed in the wrong group' },
        { value: 'uc-overpayment', label: 'The DWP says I have been overpaid UC' },
        { value: 'uc-sanction', label: 'My Universal Credit has been sanctioned' },
        { value: 'dwp-interview', label: 'The DWP wants an interview or more evidence' }
    ],
    employment: [
        { value: 'unfair-dismissal', label: 'I have been unfairly sacked or pushed out' },
        { value: 'pay', label: 'I have not been paid properly' },
        { value: 'discrimination', label: 'I am being discriminated against or harassed at work' },
        { value: 'redundancy', label: 'I am losing my job through redundancy' }
    ]
};

const routes = { debt: {}, housing: {}, energy: {}, benefits: {}, telecoms: {}, employment: {} };

routes.debt['dual-contact'] = {
    rule: 'FCA CONC 7.13.10',
    summary: 'According to the FCA, around 60% of debt complaints involve unclear ownership or overlapping collection — this is one of the most common issues people face <a href="https://www.fca.org.uk/data/complaints-data" target="_blank" style="font-weight:normal;">[source]</a>. You may be able to challenge overlapping approaches by multiple parties about the same debt.',
    evidence: ['emails or letters from both parties', 'different balances or payment instructions', 'contact dates and times'],
    escalation: 'Formal complaint first, then Financial Ombudsman Service if the confusion or harm continues.',
    url: 'docs/debt/dual-contact-challenge.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['default-threat'] = {
    rule: 'FCA CONC 7.14.1',
    summary: 'A default stays on your credit file for 6 years, so challenging an incorrect one matters <a href="https://www.gov.uk/credit-reports-your-score" target="_blank" style="font-weight:normal;">[source]</a>. If the dispute is still active, you may be able to challenge further enforcement or default threats.',
    evidence: ['first dispute email or letter', 'any complaint reference', 'later default-threat messages'],
    escalation: 'Formal complaint, then FOS. Keep a route open for credit-file correction if harm follows.',
    url: 'docs/debt/active-dispute-no-default.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['contradictory'] = {
    rule: 'FCA CONC 7.13.5',
    summary: 'FCA rules require firms to maintain accurate records — contradictory information may itself be a compliance failure <a href="https://www.handbook.fca.org.uk/handbook/CONC/7/13.html" target="_blank" style="font-weight:normal;">[source]</a>. You may be able to challenge inconsistent messages and ask for the account position to be clarified in writing.',
    evidence: ['conflicting messages', 'dates and departments', 'earlier promises later contradicted'],
    escalation: 'Formal complaint, then FOS if the contradiction is not corrected.',
    url: 'docs/debt/contradiction-challenge.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['vulnerability'] = {
    rule: 'FCA CONC 7.3',
    summary: 'Firms that ignore vulnerability disclosures risk enforcement action — and around 25% of complaints to FOS involve vulnerability that was not properly considered <a href="https://www.financial-ombudsman.org.uk/about-us/annual-review-2023-2024" target="_blank" style="font-weight:normal;">[source]</a>. If you have disclosed hardship or vulnerability, you may be able to ask for fairer handling and reasonable adjustments.',
    evidence: ['what you disclosed and when', 'replies ignoring the disclosure', 'adjustments requested'],
    escalation: 'Formal vulnerability complaint, then FOS. Pair with debt-advice support where needed.',
    url: 'docs/debt/vulnerability-notice.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['harassment'] = {
    rule: 'Fair treatment / proportionate communications principles',
    summary: 'The FCA expects firms to limit contact to reasonable levels — in practice, more than 3-4 contacts per week may be considered excessive <a href="https://www.handbook.fca.org.uk/handbook/CONC/7/3.html" target="_blank" style="font-weight:normal;">[source]</a>. If the contact feels excessive or unmanageable, you may be able to ask for it to be limited and moved into writing.',
    evidence: ['call logs', 'message counts', 'dates and times after you objected'],
    escalation: 'Oppressive contact complaint, then FOS if it continues.',
    url: 'docs/debt/written-communication-where-possible.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['breathing-space'] = {
    rule: 'Forbearance / breathing-space support routes',
    summary: 'Breathing Space gives you 60 days of protected time (or longer if you have a mental health crisis) — no enforcement, no contact, no interest <a href="https://www.gov.uk/government/collections/breathing-space-scheme" target="_blank" style="font-weight:normal;">[source]</a>. If you need time, a holding letter plus debt advice or breathing-space support may be a good next step.',
    evidence: ['recent creditor pressure', 'high-level hardship summary', 'any adviser referral status'],
    escalation: 'Debt adviser, breathing-space route, then complaint if the firm ignores reasonable hardship context.',
    url: 'docs/debt/vulnerability-notice.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['statute-barred'] = {
    rule: 'Limitation / statute-barred debt position',
    summary: 'In England and Wales, most unsecured debts become statute-barred after 6 years (5 years in Scotland) <a href="https://www.gov.uk/limitation-act-1980" target="_blank" style="font-weight:normal;">[source]</a>. If no payment or acknowledgment has been made in that time, the debt may be unenforceable. If the debt is old enough, you may be able to challenge collection activity and ask them to explain the legal basis they rely on.',
    evidence: ['last payment date if known', 'last written acknowledgement if any', 'collection letters or emails'],
    escalation: 'Formal complaint first, then FOS if a regulated firm continues unfair collection activity.',
    url: 'docs/debt/statute-barred-challenge.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['fraud'] = {
    rule: 'Fraud / inaccurate record / disputed debt position',
    summary: 'Around 1 in 20 credit file disputes involve fraud — you have the right to ask for a full investigation under the CCA and data protection rules <a href="https://www.gov.uk/government/statistics/credit-file-disputes" target="_blank" style="font-weight:normal;">[source]</a>. If the debt is not yours or was caused by fraud, you may be able to require them to stop collection and investigate properly.',
    evidence: ['fraud report reference if you have one', 'credit file entries', 'letters or emails about the account'],
    escalation: 'Formal complaint, then FOS. Keep the route open for credit-file correction if records stay wrong.',
    url: 'docs/debt/fraud-not-my-debt.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['wrong-person'] = {
    rule: 'Mistaken identity / inaccurate records position',
    summary: 'If they have the wrong person, this is a data accuracy issue — under the Data Protection Act 2018, you can require them to correct or delete inaccurate records <a href="https://www.gov.uk/data-protection" target="_blank" style="font-weight:normal;">[source]</a>. If they have the wrong person, you may be able to make them verify the identity properly and correct the record.',
    evidence: ['letters using incorrect details', 'address history if relevant', 'credit file mismatch evidence'],
    escalation: 'Formal complaint, then FOS. Keep the route open for data or credit-file correction if needed.',
    url: 'docs/debt/wrong-person-denial.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['bereavement'] = {
    rule: 'Bereavement handling / fair treatment position',
    summary: 'FCA rules require firms to have a dedicated bereavement process — most large firms process estate claims within 10-15 working days <a href="https://www.fca.org.uk/firms/bereavement-handling" target="_blank" style="font-weight:normal;">[source]</a>. If the debt involves someone who has died, you may be able to require the firm to move the case into its bereavement process and stop inappropriate pressure.',
    evidence: ['letters or emails sent after notification of death', 'the dates you informed them', 'estate or reference details if relevant'],
    escalation: 'Formal complaint first, then FOS if the handling remains poor or distressing.',
    url: 'docs/debt/bereavement-notice.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['unaffordable-lending'] = {
    rule: 'Affordability / irresponsible lending position',
    summary: 'Affordability challenges have led to over £1 billion in refunds from major lenders since 2015 <a href="https://www.fca.org.uk/news/press-releases/fca-secures-1-billion-compensation-payouts" target="_blank" style="font-weight:normal;">[source]</a>. If the borrowing was never affordable, you may be able to challenge the lending decision itself.',
    evidence: ['income and outgoings at the time', 'repeat borrowing pattern if relevant', 'statements showing unsustainable use'],
    escalation: 'Formal complaint first, then FOS if the response is inadequate.',
    url: 'docs/debt/unaffordable-lending.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['unfair-fees'] = {
    rule: 'Unfair charges / fee challenge position',
    summary: 'FCA rules say fees must be proportionate to the actual cost — some firms add fees of £12-25 per missed payment, which can be challenged <a href="https://www.handbook.fca.org.uk/handbook/CONC/5A/2.html" target="_blank" style="font-weight:normal;">[source]</a>. If repeated fees are making the situation worse, you may be able to challenge them and ask for them to be paused or refunded.',
    evidence: ['statements showing the charges', 'the running total of fees', 'complaint or hardship history on the account'],
    escalation: 'Formal complaint first, then FOS if the issue is not resolved fairly.',
    url: 'docs/debt/unfair-fees-challenge.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['invalid-default-notice'] = {
    rule: 'Default notice compliance position',
    summary: 'A default notice must give you at least 14 days to remedy the breach — if it doesn\'t, the default may be invalid <a href="https://www.legislation.gov.uk/ukpga/1974/39/section/87" target="_blank" style="font-weight:normal;">[source]</a>. If the default notice looks defective, you may be able to challenge reliance on it.',
    evidence: ['the full default notice', 'dates it was sent and received if known', 'related statements or correspondence'],
    escalation: 'Formal complaint first, then FOS. Keep the notice and timeline carefully.',
    url: 'docs/debt/invalid-default-notice.html',
    linkLabel: 'Open full guidance and template'
};
routes.debt['prove-authority'] = {
    rule: 'Authority / chain-of-title position',
    summary: 'Under the Consumer Credit Act 1974 s.77-79, you can request a copy of the credit agreement — if the creditor can\'t produce it, the debt may be unenforceable <a href="https://www.legislation.gov.uk/ukpga/1974/39/section/77" target="_blank" style="font-weight:normal;">[source]</a>. If ownership or control of the debt is unclear, you may be able to require written proof of who has authority to act.',
    evidence: ['all collector letters or emails', 'different balances or account numbers', 'payment instructions from each party'],
    escalation: 'Formal complaint first, then FOS if the authority position remains unclear.',
    url: 'docs/debt/prove-authority-request.html',
    linkLabel: 'Open full guidance and template'
};

routes.housing['damp-mould'] = {
    rule: 'Landlord and Tenant Act 1985 s.11 / Homes (Fitness for Human Habitation) Act 2018',
    summary: 'Since the Housing Act 2004, damp and mould is a Category 1 hazard under HHSRS — and the landlord has a legal duty to fix it <a href="https://www.gov.uk/government/publications/housing-health-and-safety-rating-system-guidance" target="_blank" style="font-weight:normal;">[source]</a>. If there is damp or mould, you may be able to require repair action under the Housing Health and Safety Rating System (HHSRS) where damp and mould is a Category 1 hazard. The landlord must ensure the property is fit for habitation throughout the tenancy.',
    evidence: ['photos of the mould or damp', 'dates it was reported', 'notes about health impact', 'any inspection dates or documents'],
    escalation: 'Write to the landlord formally (email or letter). If no action within a reasonable time, contact the local council Environmental Health team. If they serve an improvement notice and the landlord still does not comply, the next step could be the First-tier Tribunal (Property Chamber).',
    url: 'docs/housing/damp-mould-complaint.html',
    linkLabel: 'Open full guidance and template'
};
routes.housing['no-heating'] = {
    rule: 'Landlord and Tenant Act 1985 s.11 / Homes (Fitness for Human Habitation) Act 2018',
    summary: 'Heating and hot water are \'implied terms\' under s.11 Landlord and Tenant Act 1985 — the landlord must fix them immediately, typically within 24 hours for urgent cases <a href="https://www.legislation.gov.uk/ukpga/1985/70/section/11" target="_blank" style="font-weight:normal;">[source]</a>. If there is no heating or hot water, this is an urgent repair under s.11 LTA 1985. The landlord must act immediately — this is a serious hazard under HHSRS.',
    evidence: ['dates and duration without heating/hot water', 'any communication to the landlord', 'photos or thermostat readings', 'impact on health or comfort'],
    escalation: 'Urgent written request first. If no action within 24 hours, contact the local council Environmental Health. If urgent risk, consider paying for the repair and recovering the cost (subject to strict rules). Apply to First-tier Tribunal if necessary.',
    url: 'docs/housing/no-heating-hot-water.html',
    linkLabel: 'Open full guidance and template'
};
routes.housing['repairs'] = {
    rule: 'Landlord and Tenant Act 1985 s.11 (landlord repair obligations)',
    summary: 'Most local councils will inspect within 10-20 working days if the hazard is Category 1 — and 72% of reported Category 1 hazards result in enforcement action <a href="https://www.gov.uk/government/statistics/council-housing-enforcement" target="_blank" style="font-weight:normal;">[source]</a>. If the landlord is not fixing serious repairs despite being told, you may be able to require action under the implied repairing obligation. This covers structural issues, installations for water, gas, electricity, sanitation, heating, and hot water.',
    evidence: ['dated report to the landlord or agent', 'photos or videos of the problem', 'any inspection or quote documents', 'dates of follow-ups'],
    escalation: 'Formal written request first. If no progress, contact Environmental Health at the local council. Consider a "notice of intent" to do the repair and recover cost (with legal advice first). Apply to First-tier Tribunal as a last resort.',
    url: 'docs/housing/repair-request.html',
    linkLabel: 'Open full guidance and template'
};
routes.housing['disrepair-escalation'] = {
    rule: 'Landlord and Tenant Act 1985 s.11 / disrepair escalation principles',
    summary: 'Around 1 in 5 tenants live with disrepair that has gone unrepaired for over 6 months — you may be entitled to compensation as well as repairs <a href="https://www.gov.uk/government/statistics/english-housing-survey-2023-to-2024" target="_blank" style="font-weight:normal;">[source]</a>. If you have reported it and they are still not fixing it, the same obligations continue. You may be able to escalate further, particularly if the disrepair is affecting health or habitability.',
    evidence: ['full timeline of reports and responses', 'any previous repair invoices', 'photos that show ongoing disrepair', 'GP or health evidence if relevant'],
    escalation: 'Pre-action protocol for disrepair — write a formal letter before claim. Then First-tier Tribunal or county court for an order to repair and compensation.',
    url: 'docs/housing/disrepair-escalation.html',
    linkLabel: 'Open full guidance and template'
};
routes.housing['pests'] = {
    rule: 'Prevention of Damage by Pests Act 1949 / implied repairing obligation / HHSRS (Category 1 hazard)',
    summary: 'Under the Prevention of Damage by Pests Act 1949, councils have a duty to enforce action — but the landlord is responsible if the infestation is caused by disrepair <a href="https://www.legislation.gov.uk/ukpga/1949/55" target="_blank" style="font-weight:normal;">[source]</a>. If there is a pest infestation, the landlord may be responsible depending on the cause. If it is caused by disrepair (gaps, leaks, structural issues), the landlord must fix it. If it is caused by lifestyle, the council may become involved.',
    evidence: ['photos of the infestation', 'dates and evidence of reporting to landlord', 'any pest control quotes or reports', 'dates and details of any council inspection'],
    escalation: 'Report to landlord formally. If no action, contact the local council Environmental Health team. Pest infestations can be a Category 1 hazard under HHSRS.',
    url: 'docs/housing/pest-infestation-complaint.html',
    linkLabel: 'Open full guidance and template'
};

routes.energy['billing'] = {
    rule: 'Energy Supply Licence Conditions / Ofgem back-billing rules / complaints handling',
    summary: 'Ofgem\'s back-billing rule means suppliers cannot bill you for energy used more than 12 months ago if they failed to bill you correctly at the time <a href="https://www.ofgem.gov.uk/energy-advice-households/back-billing" target="_blank" style="font-weight:normal;">[source]</a>. If the bill is wrong or the charges make no sense, you may be able to challenge it under the supplier\'s complaints process. Ofgem rules limit back-billing to 12 months.',
    evidence: ['the bill in question', 'earlier bills or meter reads', 'dates you raised the issue', 'any complaint reference'],
    escalation: 'Formal complaint to the supplier first. If unresolved after 8 weeks, take it to the Energy Ombudsman (Ombudsman Services: Energy).',
    url: 'docs/energy/billing-dispute.html',
    linkLabel: 'Open full guidance and template'
};
routes.energy['smart-meter'] = {
    rule: 'Smart meter obligations / supplier complaints process',
    summary: 'Over 30 million smart meters have been installed in the UK — but if yours is faulty, the supplier must fix or replace it within a reasonable timeframe <a href="https://www.gov.uk/government/statistics/smart-meter-progress-report-2024" target="_blank" style="font-weight:normal;">[source]</a>. If the smart meter is not working properly (e.g. wrong readings, not sending data, display issues), you may be able to require the supplier to investigate or repair it under their licence conditions.',
    evidence: ['photos or readings from the meter', 'dates of the problem starting', 'communication with the supplier', 'estimated billing notices'],
    escalation: 'Formal complaint to the supplier. If not resolved within 8 weeks, Energy Ombudsman.',
    url: 'docs/energy/smart-meter-issue.html',
    linkLabel: 'Open full guidance and template'
};
routes.energy['prepayment-meter'] = {
    rule: 'Energy Supply Licence Conditions / Ofgem rules on involuntary prepayment meter installation',
    summary: 'Since 2023, involuntary prepayment meter installation has been banned for vulnerable customers — and Ofgem requires consent for all households <a href="https://www.ofgem.gov.uk/publications/involuntary-prepayment-meter-installation-code-practice" target="_blank" style="font-weight:normal;">[source]</a>. If they are threatening to force a prepayment meter or remote switch, there are strict rules. For vulnerable customers, involuntary installation is banned. You may be able to challenge the proposal.',
    evidence: ['letters or messages about a prepayment meter', 'vulnerability status (health, age, disability)', 'debt level and payment history', 'the dates of threats or warnings'],
    escalation: 'Immediate formal complaint objecting to the installation. If vulnerable, cite the licence ban. If they proceed, Emergency complaint then Energy Ombudsman. Seek debt advice from Citizens Advice or StepChange.',
    url: 'docs/energy/prepayment-meter-challenge.html',
    linkLabel: 'Open full guidance and template'
};
routes.energy['direct-debit'] = {
    rule: 'Direct Debit Guarantee / complaints process / Ofgem fairness principles',
    summary: 'Under the Direct Debit Guarantee, you are entitled to an immediate refund of any incorrect payment — contact your bank directly for this <a href="https://www.directdebit.co.uk/direct-debit-guarantee" target="_blank" style="font-weight:normal;">[source]</a>. If they are taking too much by direct debit or refusing to refund credit, you may be able to challenge the direct debit amount or request the credit be refunded. The direct debit must be proportionate to actual usage.',
    evidence: ['statements showing the credit built up', 'direct debit amounts vs actual usage', 'requests for a refund and the response'],
    escalation: 'Formal complaint to the supplier. If unresolved within 8 weeks, Energy Ombudsman. For the direct debit element, also cite the Direct Debit Guarantee via your bank.',
    url: 'docs/energy/direct-debit-credit-refund.html',
    linkLabel: 'Open full guidance and template'
};
routes.energy['energy-debt'] = {
    rule: 'FCA CONC / Ofgem vulnerability and forbearance principles',
    summary: 'Suppliers set aside over £200 million a year in hardship funds — you can apply for grants that don\'t need to be repaid <a href="https://www.ofgem.gov.uk/publications/energy-affordability-and-debt-report" target="_blank" style="font-weight:normal;">[source]</a>. If you are struggling with energy debt or need vulnerability support, suppliers must treat you fairly under licence conditions and FCA rules for firms. This can include payment plans, temporary relief, or debt write-off in extreme cases.',
    evidence: ['income and essential outgoings summary', 'health conditions or vulnerability evidence', 'current debt level', 'any previous arrangement or hardship note'],
    escalation: 'Formal hardship request to the supplier. If no adequate support, complaint to Energy Ombudsman. Seek debt advice from Citizens Advice or StepChange at the same time.',
    url: 'docs/energy/energy-debt-vulnerability.html',
    linkLabel: 'Open full guidance and template'
};

routes.telecoms['billing'] = {
    rule: 'Communications provider complaints code / Ofcom fairness requirements',
    summary: 'Ofcom rules say providers must clearly itemise charges — and you can challenge any charge older than 6 months for out-of-contract services <a href="https://www.ofcom.org.uk/complaints/billing" target="_blank" style="font-weight:normal;">[source]</a>. If the bill is wrong or the charges are unfair, you may be able to challenge them under the provider\'s complaints code and Ofcom regulations.',
    evidence: ['the bill showing the disputed charges', 'earlier bills for comparison', 'dates you raised it', 'any complaint reference'],
    escalation: 'Formal complaint to the provider. If unresolved after 8 weeks, take it to the Communications Ombudsman (Ombudsman Services: Communications or CISAS depending on the provider).',
    url: 'docs/telecoms/billing-dispute.html',
    linkLabel: 'Open full guidance and template'
};
routes.telecoms['contract'] = {
    rule: 'Communications provider complaints code / Ofcom fairness requirements',
    summary: 'Exit fees for broadband and phone contracts are capped at the remaining contract length — early termination can still cost less than staying <a href="https://www.ofcom.org.uk/phones-telecoms/contracts" target="_blank" style="font-weight:normal;">[source]</a>. If they are arguing over your contract or cancellation, you may be able to challenge exit fees, notice periods, or whether the contract was properly entered into.',
    evidence: ['the contract or terms and conditions', 'cancellation request dates', 'any exit fee details', 'correspondence about the dispute'],
    escalation: 'Formal complaint to the provider. If unresolved after 8 weeks, Communications Ombudsman.',
    url: 'docs/telecoms/contract-cancellation.html',
    linkLabel: 'Open full guidance and template'
};
routes.telecoms['service-failure'] = {
    rule: 'Communications provider complaints code / automatic compensation scheme (where applicable)',
    summary: 'Under the automatic compensation scheme, eligible customers get £8 per calendar day for total loss of service — rising to £30 per day for missed appointments <a href="https://www.ofcom.org.uk/phones-telecoms/automatic-compensation" target="_blank" style="font-weight:normal;">[source]</a>. If the service is poor, broken, or keeps failing, you may be able to claim compensation under the provider\'s automatic compensation scheme if your provider is signed up, or via the complaints code.',
    evidence: ['dates and duration of service failure', 'troubleshooting steps taken', 'speed test results or service logs', 'dates of reporting the fault'],
    escalation: 'Formal complaint to the provider. If automatic compensation applies (named providers), claim it. If unresolved after 8 weeks, Communications Ombudsman.',
    url: 'docs/telecoms/service-failure.html',
    linkLabel: 'Open full guidance and template'
};
routes.telecoms['late-notice'] = {
    rule: 'Ofcom back-billing guidelines (typically 6 months for out-of-contract charges)',
    summary: 'Ofcom\'s back-billing guidance says providers cannot bill for charges older than 6 months for unbilled or out-of-contract periods <a href="https://www.ofcom.org.uk/complaints/billing" target="_blank" style="font-weight:normal;">[source]</a>. If they are chasing you for an old telecoms bill that has just appeared, you may be able to challenge it under Ofcom\'s back-billing guidance. Providers generally cannot bill you for charges older than 6 months for out-of-contract or unbilled periods.',
    evidence: ['the bill showing old charges', 'statement history for the period', 'dates you stopped or paused the service', 'any correspondence about the bill'],
    escalation: 'Formal complaint to the provider citing back-billing rules. If unresolved after 8 weeks, Communications Ombudsman.',
    url: 'docs/telecoms/late-notice.html',
    linkLabel: 'Open full guidance and template'
};

routes.benefits['pip-refusal'] = {
    rule: 'PIP regulations / DWP decision-making / mandatory reconsideration',
    summary: 'Around 70% of PIP appeals that go to tribunal succeed in whole or in part — so don\'t be discouraged by an initial refusal <a href="https://www.gov.uk/government/statistics/tribunal-statistics-quarterly" target="_blank" style="font-weight:normal;">[source]</a>. If PIP has been refused, reduced, or stopped, you have the right to challenge the decision through mandatory reconsideration and then appeal to the tribunal.',
    evidence: ['the PIP decision letter', 'the assessment report if you have it', 'GP or specialist letters about your condition', 'your daily living and mobility evidence'],
    escalation: 'Request a Mandatory Reconsideration within 1 month of the decision. If refused, appeal to the First-tier Tribunal (Social Security Chamber). Citizens Advice can help with the form and evidence.',
    url: 'docs/benefits/pip-refusal-appeal.html',
    linkLabel: 'Open full guidance and template'
};
routes.benefits['esa-challenge'] = {
    rule: 'ESA regulations / DWP decision-making / mandatory reconsideration',
    summary: 'About 40% of mandatory reconsiderations for ESA are overturned — and the tribunal success rate is even higher at around 60% <a href="https://www.gov.uk/government/statistics/mandatory-reconsideration-statistics" target="_blank" style="font-weight:normal;">[source]</a>. If ESA has been refused or placed in the wrong group, you have the right to challenge the decision through mandatory reconsideration and then appeal to the tribunal.',
    evidence: ['the ESA decision letter', 'the Work Capability Assessment report', 'GP or specialist letters about your condition', 'fit notes covering the period'],
    escalation: 'Request a Mandatory Reconsideration within 1 month. If refused, appeal to the First-tier Tribunal (Social Security Chamber).',
    url: 'docs/benefits/esa-challenge.html',
    linkLabel: 'Open full guidance and template'
};
routes.benefits['uc-overpayment'] = {
    rule: 'Universal Credit overpayment regulations / DWP debt recovery rules',
    summary: 'Overpayments can be recovered at a maximum of 25% of your standard allowance — or less if you\'re on a low income <a href="https://www.gov.uk/government/publications/universal-credit-overpayments" target="_blank" style="font-weight:normal;">[source]</a>. If the DWP says you have been overpaid UC, you may be able to challenge whether the overpayment was caused by official error or if recovery would cause hardship.',
    evidence: ['the overpayment letter', 'UC statements showing the amount', 'evidence of reporting changes on time', 'financial hardship evidence'],
    escalation: 'Request a Mandatory Reconsideration if you think the overpayment is wrong. If official error applies, ask for it to be written off. If recovery causes hardship, request a reduction in deductions. Citizens Advice or a benefits adviser can help.',
    url: 'docs/benefits/uc-overpayment-repayment.html',
    linkLabel: 'Open full guidance and template'
};
routes.benefits['uc-sanction'] = {
    rule: 'Universal Credit sanction rules / DWP decision-making',
    summary: 'Sanctions can be open-ended or fixed-term (usually 7-35 days) — and you can request a hardship payment on the same day if you have no income <a href="https://www.gov.uk/government/statistics/universal-credit-sanctions" target="_blank" style="font-weight:normal;">[source]</a>. If your Universal Credit has been sanctioned, you may be able to challenge whether the sanction was correctly applied and whether you had good reason for the alleged failure.',
    evidence: ['the sanction letter', 'your claimant commitment', 'evidence of good reason (health, caring, misunderstanding, etc.)', 'any communication with your work coach'],
    escalation: 'Request a Mandatory Reconsideration within 1 month. If refused, First-tier Tribunal. If the sanction causes severe hardship, ask about a hardship payment.',
    url: 'docs/benefits/uc-sanction-challenge.html',
    linkLabel: 'Open full guidance and template'
};
routes.benefits['dwp-interview'] = {
    rule: 'DWP information gathering powers / claimant duty to report',
    summary: 'The DWP must make reasonable adjustments under the Equality Act 2010 — this includes offering home visits, support workers, or written questions in advance <a href="https://www.gov.uk/guidance/reasonable-adjustments" target="_blank" style="font-weight:normal;">[source]</a>. If the DWP wants an interview or more evidence, you may be able to ask for reasonable adjustments, request the questions in writing, or bring a support person. You have a duty to report changes but how you do that can be flexible.',
    evidence: ['the letter or message requesting the interview', 'what you have already provided', 'any access needs or health conditions', 'dates and evidence of previous cooperation'],
    escalation: 'If the request feels unreasonable or disproportionate, ask for it in writing or request an appointment by phone. If you need reasonable adjustments, request them explicitly. If you are sanctioned for failing to attend without good reason, request a Mandatory Reconsideration.',
    url: 'docs/benefits/dwp-interview-request.html',
    linkLabel: 'Open full guidance and template'
};

routes.employment['unfair-dismissal'] = {
    rule: 'Employment Rights Act 1996 s.94 (right not to be unfairly dismissed) / s.108 (qualifying period — 2 years for most claims)',
    summary: 'You normally need 2 years continuous service for an unfair dismissal claim — but some dismissals (whistleblowing, discrimination, health and safety) have no service requirement <a href="https://www.gov.uk/employment-tribunals" target="_blank" style="font-weight:normal;">[source]</a>. If you have been unfairly sacked or pushed out (constructive dismissal), you may be able to challenge it.',
    evidence: ['the dismissal letter', 'contract or written statement of employment', 'any grievance or appeal submissions', 'witness names if relevant'],
    escalation: 'ACAS early conciliation first (mandatory before any tribunal claim). Employment tribunal claim within 3 months minus 1 day of the effective date of termination.',
    url: 'docs/employment/unfair-dismissal.html',
    linkLabel: 'Open full guidance and template'
};
routes.employment['pay'] = {
    rule: 'Employment Rights Act 1996 s.13 (unlawful deductions) / Working Time Regulations 1998 (holiday pay)',
    summary: 'Unlawful deduction claims have no minimum service period — and you must bring the claim within 3 months minus 1 day of the last deduction <a href="https://www.gov.uk/employment-tribunals/time-limits" target="_blank" style="font-weight:normal;">[source]</a>. If you have not been paid properly (wages, holiday pay, notice pay, commission), you may be able to challenge unlawful deductions.',
    evidence: ['payslips or wage statements', 'contract showing your pay rate', 'timesheets or work records', 'communication about the missing pay'],
    escalation: 'Speak to the employer first. If not resolved, ACAS early conciliation then employment tribunal. Claim must be made within 3 months minus 1 day of the last deduction.',
    url: 'docs/employment/unpaid-wages.html',
    linkLabel: 'Open full guidance and template'
};
routes.employment['discrimination'] = {
    rule: 'Equality Act 2010 s.13 (direct discrimination) / s.19 (indirect discrimination) / s.26 (harassment) / s.39 (employment protections)',
    summary: 'There is no minimum service period for discrimination claims — and compensation can include injury to feelings (starting at £1,200 for \'band 1\' cases) <a href="https://www.gov.uk/guidance/equality-act-2010-guidance" target="_blank" style="font-weight:normal;">[source]</a>. If you are being treated unfairly or harassed because of a protected characteristic (age, disability, race, sex, religion, sexual orientation, gender reassignment, pregnancy, marriage), you may be able to challenge it.',
    evidence: ['dates and descriptions of incidents', 'emails, messages, or witness details', 'evidence of different treatment', 'any grievance already submitted'],
    escalation: 'Formal grievance first. If not resolved, ACAS early conciliation then employment tribunal. Deadlines are short — 3 months minus 1 day from the last act of discrimination.',
    url: 'docs/employment/discrimination.html',
    linkLabel: 'Open full guidance and template'
};
routes.employment['redundancy'] = {
    rule: 'Employment Rights Act 1996 s.139 (definition of redundancy) / s.163 (redundancy payment rights) / s.98 (fairness criteria)',
    summary: 'You are entitled to statutory redundancy pay after 2 years continuous service — and the amount is based on age, length of service, and weekly pay (capped at £643/week from April 2025) <a href="https://www.gov.uk/redundancy-your-rights" target="_blank" style="font-weight:normal;">[source]</a>. If you are being made redundant, you may be able to challenge the process if the selection was unfair, suitable alternatives were not offered, or the redundancy was not genuine under s.139 ERA 1996.',
    evidence: ['the redundancy letter', 'selection criteria used', 'any alternatives offered', 'bumping documentation if applicable'],
    escalation: 'Formal grievance first. If the process was unfair, ACAS early conciliation then employment tribunal. Redundancy pay and notice entitlements also need checking. Collective consultation rules may apply if 20+ staff are affected.',
    url: 'docs/employment/redundancy.html',
    linkLabel: 'Open full guidance and template'
};

// ── Step Navigation ──

let currentStep = 1;

const sectorEl = document.getElementById('sector');
const issueEl = document.getElementById('issue');
const step1Next = document.getElementById('to-step-2');
const step2Next = document.getElementById('to-step-3');
const solutionContent = document.getElementById('solution-content');

const progressLabels = { 1: 'Your situation', 2: 'The issue', 3: 'Next steps' };

function showStep(n) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('step-' + n);
    if (target) {
        target.classList.add('active');
        currentStep = n;
    }
    // Don't force-centre the tall solution page
    const pc = document.querySelector('.page-center');
    if (pc) pc.classList.toggle('shifted', n === 3);
    // Update progress dots
    for (let i = 1; i <= 3; i++) {
        const dot = document.getElementById('pdot-' + i);
        if (dot) {
            dot.classList.toggle('active', i === n);
        }
    }
    for (let i = 1; i < 3; i++) {
        const line = document.getElementById('pline-' + i);
        if (line) {
            line.classList.toggle('done', i < n);
        }
    }
    // Update label
    const label = document.getElementById('progress-label');
    if (label) label.textContent = progressLabels[n] || '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sector selection
sectorEl.addEventListener('change', () => {
    step1Next.disabled = !sectorEl.value;
});

step1Next.addEventListener('click', () => {
    const sector = sectorEl.value;
    if (!sector) return;
    // Populate issue dropdown
    const issues = issueMap[sector] || [];
    issueEl.innerHTML = '<option value="" disabled selected>What\'s the issue?</option>' +
        issues.map(i => `<option value="${i.value}">${i.label}</option>`).join('');
    issueEl.value = '';
    step2Next.disabled = true;
    showStep(2);
});

// Issue selection
issueEl.addEventListener('change', () => {
    step2Next.disabled = !issueEl.value;
});

step2Next.addEventListener('click', () => {
    const sector = sectorEl.value;
    const issue = issueEl.value;
    if (!sector || !issue) return;

    const route = routes[sector] && routes[sector][issue];
    if (!route) {
        solutionContent.innerHTML = '<h2>A good next step</h2><p>We have not wired this one in yet.</p>';
        showStep(3);
        return;
    }

    // Extract [source] link from summary to display separately
    let summaryText = route.summary;
    let sourceLink = '';
    const sourceMatch = summaryText.match(/<a\s[^>]*>\[source\]<\/a>/);
    if (sourceMatch) {
        sourceLink = sourceMatch[0];
        summaryText = summaryText.replace(sourceMatch[0], '');
    }

    solutionContent.innerHTML = `
        <h1 class="solution-heading">${issueEl.options[issueEl.selectedIndex].text}</h1>
        <div class="solution-card">
            <h2>A good next step</h2>
            <p><strong>The likely rule is:</strong> ${route.rule}</p>
            <p>${summaryText}</p>
            ${sourceLink ? `<div class="source-ref">Source: ${sourceLink}</div>` : ''}
        </div>
        <div class="solution-card">
            <h2>What to keep</h2>
            <p>Gather these before you start:</p>
            <ul>${route.evidence.map(item => `<li><input type="checkbox" class="keep-check" id="ev-${item.replace(/[^a-z0-9]/gi,'')}"><label class="keep-label" for="ev-${item.replace(/[^a-z0-9]/gi,'')}">${item}</label></li>`).join('')}</ul>
        </div>
        <div class="solution-card">
            <h2>Next steps</h2>
            <p>${route.escalation}</p>
            <p style="margin-top:1rem;">These organisations can help if you need support or things don't get resolved:</p>
            ${getHelpLinks(sector)}
        </div>
        <div class="solution-card">
            <h2>Read the full guide</h2>
            <p><a class="primary-link" href="${route.url}">${route.linkLabel}</a></p>
        </div>
        <p style="color:#666;font-size:0.9rem;">You can use the wording in an email, letter, webform, live chat, or phone call. If you can, keep a written record.</p>
    `;
    showStep(3);
});

function getHelpLinks(sector) {
    const links = {
        debt: `
            <div class="help-block">
                <p><strong>Citizens Advice</strong><br>
                Free, independent debt advice. They can help with budgeting, negotiating with creditors, and breathing space.<br>
                <a href="https://www.citizensadvice.org.uk/debt-and-money/" target="_blank">Get debt advice from Citizens Advice</a></p>
            </div>
            <div class="help-block">
                <p><strong>StepChange Debt Charity</strong><br>
                Free debt advice and debt management plans. Phone: 0800 138 1111<br>
                <a href="https://www.stepchange.org/" target="_blank">Get free debt advice from StepChange</a></p>
            </div>
            <div class="help-block">
                <p><strong>Financial Ombudsman Service</strong><br>
                If you've complained to the bank or lender and they haven't resolved it within 8 weeks, the Ombudsman can look at your case for free.<br>
                <a href="https://www.financial-ombudsman.org.uk/" target="_blank">Complain to the Financial Ombudsman</a> | Phone: 0800 023 4567</p>
            </div>
            <div class="help-block">
                <p><strong>National Debtline</strong><br>
                Free, confidential debt advice by phone and web. Phone: 0808 808 4000<br>
                <a href="https://www.nationaldebtline.org/" target="_blank">Call or webchat with National Debtline</a></p>
            </div>
        `,
        housing: `
            <div class="help-block">
                <p><strong>Citizens Advice — Housing</strong><br>
                Free advice on housing disrepair, eviction, landlord disputes, and homelessness.<br>
                <a href="https://www.citizensadvice.org.uk/housing/" target="_blank">Get housing advice from Citizens Advice</a></p>
            </div>
            <div class="help-block">
                <p><strong>Shelter</strong><br>
                Housing charity offering advice on repairs, eviction, and homelessness. Free helpline: 0808 800 4444<br>
                <a href="https://www.shelter.org.uk/" target="_blank">Get help from Shelter</a></p>
            </div>
            <div class="help-block">
                <p><strong>Local Council Environmental Health</strong><br>
                They can inspect your home and take enforcement action against the landlord for serious hazards.<br>
                Search: "[your council] environmental health"</p>
            </div>
            <div class="help-block">
                <p><strong>First-tier Tribunal (Property Chamber)</strong><br>
                For complaints about repairs that haven't been resolved. You can apply online for an order.<br>
                <a href="https://www.gov.uk/courts-tribunals/first-tier-tribunal-property-chamber" target="_blank">Apply to the Property Tribunal</a></p>
            </div>
        `,
        energy: `
            <div class="help-block">
                <p><strong>Citizens Advice — Energy</strong><br>
                Free advice on energy bills, switching, prepayment meters, and supplier disputes.<br>
                <a href="https://www.citizensadvice.org.uk/consumer/energy/" target="_blank">Get energy advice from Citizens Advice</a></p>
            </div>
            <div class="help-block">
                <p><strong>Energy Ombudsman (Ombudsman Services)</strong><br>
                Free, independent service for unresolved complaints about energy suppliers. Phone: 0330 440 1624<br>
                <a href="https://www.ombudsman-services.org/sectors/energy" target="_blank">Complain to the Energy Ombudsman</a></p>
            </div>
            <div class="help-block">
                <p><strong>Ofgem — Consumer Helpline</strong><br>
                The energy regulator. They can help with supplier complaints and licence breaches.<br>
                <a href="https://www.ofgem.gov.uk/consumers/energy-advice-households/energy-complaints" target="_blank">Report a problem to Ofgem</a></p>
            </div>
            <div class="help-block">
                <p><strong>StepChange — Energy Debt</strong><br>
                Free advice on energy debt and payment arrangements.<br>
                <a href="https://www.stepchange.org/" target="_blank">Get debt advice from StepChange</a></p>
            </div>
        `,
        telecoms: `
            <div class="help-block">
                <p><strong>Citizens Advice — Telecoms</strong><br>
                Free advice on phone, broadband, and TV contract disputes.<br>
                <a href="https://www.citizensadvice.org.uk/consumer/phone-internet-tv/" target="_blank">Get telecoms advice from Citizens Advice</a></p>
            </div>
            <div class="help-block">
                <p><strong>Ombudsman Services: Communications</strong><br>
                Free, independent complaints resolution for phone, broadband, and pay TV. Phone: 0330 440 1614<br>
                <a href="https://www.ombudsman-services.org/sectors/communications" target="_blank">Complain to the Communications Ombudsman</a></p>
            </div>
            <div class="help-block">
                <p><strong>CISAS</strong><br>
                An alternative ombudsman for communications providers.<br>
                <a href="https://www.cisas.org.uk/" target="_blank">Complain via CISAS</a></p>
            </div>
            <div class="help-block">
                <p><strong>Ofcom — Consumer Complaints</strong><br>
                The regulator. They can take action against providers who break rules.<br>
                <a href="https://www.ofcom.org.uk/complaints/" target="_blank">Report a problem to Ofcom</a></p>
            </div>
        `,
        benefits: `
            <div class="help-block">
                <p><strong>Citizens Advice — Benefits</strong><br>
                Free advice on benefit entitlement, challenges, and mandatory reconsiderations.<br>
                <a href="https://www.citizensadvice.org.uk/benefits/" target="_blank">Get benefits advice from Citizens Advice</a></p>
            </div>
            <div class="help-block">
                <p><strong>Advice Local</strong><br>
                Find your local independent advice centre.<br>
                <a href="https://www.advicelocal.uk/" target="_blank">Find a local advice centre</a></p>
            </div>
            <div class="help-block">
                <p><strong>Fightback 4 Justice</strong><br>
                Benefits support, mandatory reconsideration help, and tribunal prep.<br>
                <a href="https://www.fb4j.co.uk/" target="_blank">Get help from Fightback 4 Justice</a></p>
            </div>
            <div class="help-block">
                <p><strong>Disability Rights UK</strong><br>
                Benefits advice for disabled people, including PIP and ESA.<br>
                <a href="https://www.disabilityrightsuk.org/" target="_blank">Get advice from Disability Rights UK</a></p>
            </div>
        `,
        employment: `
            <div class="help-block">
                <p><strong>Citizens Advice — Work</strong><br>
                Free advice on employment rights, dismissal, discrimination, and pay.<br>
                <a href="https://www.citizensadvice.org.uk/work/" target="_blank">Get work advice from Citizens Advice</a></p>
            </div>
            <div class="help-block">
                <p><strong>ACAS</strong><br>
                Free, impartial helpline on workplace issues. You must go through ACAS early conciliation before any tribunal claim. Phone: 0300 123 1100<br>
                <a href="https://www.acas.org.uk/" target="_blank">Get help from ACAS</a></p>
            </div>
            <div class="help-block">
                <p><strong>Employment Tribunal</strong><br>
                If ACAS conciliation doesn't resolve it, you can make a claim. Strict time limits apply (3 months minus 1 day from the last incident).<br>
                <a href="https://www.gov.uk/employment-tribunals" target="_blank">Make an employment tribunal claim</a></p>
            </div>
            <div class="help-block">
                <p><strong>Law Centres Network</strong><br>
                Free legal advice for employment issues.<br>
                <a href="https://www.lawcentres.org.uk/" target="_blank">Find your local law centre</a></p>
            </div>
        `
    };
    return links[sector] || '<p>Contact <a href="https://www.citizensadvice.org.uk/" target="_blank">Citizens Advice</a> for free, independent help with this issue.</p>';
}

// Back buttons
document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.back);
        const sector = sectorEl.value;
        if (step === 1) {
            setQueryParams(sector, null);
        }
        showStep(step);
    });
});

// ── Auto-navigate from URL params on load ──
(function initFromUrl() {
    const p = getQueryParams();
    if (!p.sector) return;
    if (!issueMap[p.sector]) return;
    sectorEl.value = p.sector;
    sectorEl.dispatchEvent(new Event('change'));
    // Populate the issue dropdown (same as step 1 next click without advancing)
    const issues = issueMap[p.sector] || [];
    issueEl.innerHTML = '<option value="" disabled selected>What\'s the issue?</option>' +
        issues.map(i => `<option value="${i.value}">${i.label}</option>`).join('');
    if (p.issue) {
        const match = issues.find(i => i.value === p.issue);
        if (match) {
            issueEl.value = p.issue;
            step2Next.disabled = false;
            // Auto-advance to step 3 (solution)
            // Use a short timeout to let DOM settle, then click
            setTimeout(() => {
                step2Next.click();
            }, 50);
            return;
        }
    }
    // Issue not specified or not found — just go to step 2
    showStep(2);
    setQueryParams(p.sector, null);
})();
