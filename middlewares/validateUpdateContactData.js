exports.validateUpdateContactData = (req, res, next) => {
    const { mobile_number, email, ...otherFields  } = req.body;

    if (mobile_number === undefined && email === undefined) {
        return res.status(400).json({ error: 'At least one of mobile_number or email must be provided in the request body' });
    }

    if (mobile_number !== undefined && mobile_number.trim() !== '') {
        const mobileNumberRegex = /^\d{10}$/;
        if (!mobileNumberRegex.test(mobile_number.trim())) {
            return res.status(400).json({ error: 'Invalid mobile number format (should be 10 digits)' });
        }
    }

    if (email !== undefined && email.trim() !== '') {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
    }

    req.body = { mobile_number, email };

    next();
}
