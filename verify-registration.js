// using global fetch
const _fetch = global.fetch;

async function testRegistration() {
    const url = 'http://localhost:3000/users';
    const payload = {
        aadhaar_number: "564564564564",
        address: "A13, Gayatri kunj society, Rabari colony, Amarivadi",
        bank_account_no: "45646456456456456",
        confirmPassword: "test1234",
        email: "test.user" + Date.now() + "@gmail.com", // Unique email
        ifsc_code: "SBIN0003434",
        location: "Ahmedabad",
        name: "Yash Mehta",
        password: "test1234",
        phone: "06355" + Math.floor(Math.random() * 100000), // Unique phone
        role: "1"
    };

    try {
        console.log('Sending registration request...');
        const response = await _fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Status code:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));

        if (response.status === 201) {
            console.log('Test Passed: User created successfully.');
        } else {
            console.log('Test Failed: User creation failed.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testRegistration();
