exports.validateContactData = (req, res, next) => {
    const contactData = req.body;

    const requiredFields = ['first_name', 'last_name', 'email', 'mobile_number'];
    for (const field of requiredFields) {
        if (!contactData[field]) {
            return res.status(400).json({ error: `Missing or null value for field: ${field}` });
        }
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(contactData.email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumberRegex.test(contactData.mobile_number)) {
        return res.status(400).json({ error: 'Invalid mobile number format (should be 10 digits)' });
    }

    next();
}
