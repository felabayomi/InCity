const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 55, 320)}ms`;
    observer.observe(item);
});

const heroHeadline = document.querySelector('#hero-headline');
const heroSubheadline = document.querySelector('#hero-subheadline');
const heroPrimaryCta = document.querySelector('#hero-primary-cta');

if (heroHeadline && heroSubheadline && heroPrimaryCta) {
    const copyVariants = {
        a: {
            headline: 'Turn Boutique Hotel Stays Into Bookable City Experiences',
            subheadline: 'Give guests premium local moments without adding planning load to your front desk or concierge team.',
            cta: 'Request A Hotel Pilot Plan',
        },
        b: {
            headline: 'Increase Guest Delight And Ancillary Revenue In One Move',
            subheadline: 'We design and coordinate curated city experiences your boutique hotel can offer immediately.',
            cta: 'Get My Property Pilot Plan',
        },
        c: {
            headline: 'Your Guests Want More Than Recommendations',
            subheadline: 'Launch signature city experiences that elevate stays while we handle sourcing, booking, and logistics.',
            cta: 'Launch A 30-Day Pilot',
        },
    };

    const params = new URLSearchParams(window.location.search);
    const rawVariant = String(params.get('ab') || 'a').toLowerCase().trim();
    const selectedVariant = copyVariants[rawVariant] ? rawVariant : 'a';
    const selectedCopy = copyVariants[selectedVariant];

    heroHeadline.textContent = selectedCopy.headline;
    heroSubheadline.textContent = selectedCopy.subheadline;
    heroPrimaryCta.textContent = selectedCopy.cta;
    document.documentElement.setAttribute('data-hero-ab', selectedVariant);
}

const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const leadEmail = 'incityexperience@gmail.com';
        const data = new FormData(form);

        const fields = {
            organizationName: String(data.get('org') || '').trim(),
            contactPerson: String(data.get('contactPerson') || '').trim(),
            workEmail: String(data.get('email') || '').trim(),
            customerType: String(data.get('segment') || '').trim(),
            city: String(data.get('city') || '').trim(),
            groupSize: String(data.get('groupSize') || '').trim(),
            experienceType: String(data.get('experienceType') || '').trim(),
            budget: String(data.get('budget') || '').trim(),
            desiredDate: String(data.get('desiredDate') || '').trim(),
            message: String(data.get('message') || '').trim(),
        };

        const subject = `New In City Lead - ${fields.organizationName || 'Unknown Organization'}`;
        const body = [
            'New lead request from In City Experience website',
            '',
            `Organization Name: ${fields.organizationName}`,
            `Contact Person: ${fields.contactPerson}`,
            `Work Email: ${fields.workEmail}`,
            `Customer Type: ${fields.customerType}`,
            `City: ${fields.city}`,
            `Group Size: ${fields.groupSize}`,
            `Experience Type Needed: ${fields.experienceType}`,
            `Budget: ${fields.budget}`,
            `Desired Date: ${fields.desiredDate}`,
            '',
            'Message:',
            fields.message,
        ].join('\n');

        window.location.href = `mailto:${encodeURIComponent(leadEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const button = form.querySelector('button[type="submit"]');
        if (button) {
            button.textContent = 'Opening your email app...';
            button.disabled = true;
        }

        setTimeout(() => {
            button.textContent = 'Request Pilot Plan';
            button.disabled = false;
        }, 1800);
    });
}
