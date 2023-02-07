describe("Dashboard Page Test Cases", () => {
    it("Do Login with correct value", () =>{

        cy.visit("http://localhost:3000");
        const email = cy.get("input[name='email']");
        email.type("user@react.test");

        const password = cy.get("input[name='password']");
        password.type("password");

        const button = cy.get("button");
        button.click();
        cy.on('window:alert', (text)=> {
            expect(text).to.contains("welcome");
        });

        cy.url().should('eq', 'http://localhost:3000/dashboard');
    });

    it("Found No Post for the First Time", () => {
        cy.contains("Found 0 photos");
    });

    it("Contains Image url and description input, and publish button", () => {
        // check image
        const image = cy.get("input[name='image']");
        image.should("be.visible");
        image.should("have.attr", "type", "url");
        image.should("have.attr", "required", "required");
        image.should("have.attr", "placeholder", "Image URL");

        // check description
        const description = cy.get("input[name='desc']");
        description.should("be.visible");
        description.should("have.attr", "type", "text");
        description.should("have.attr", "required", "required");
        description.should("have.attr", "placeholder", "What's on your mind?");

        // check button
        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Publish!");
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it("Upload Some Photos", () => {
        const photos = [
            {
                imageValue:
                "https://unsplash.com/photos/yrIPwCtx0Mo",
                descriptionValue: "Image 1, Lorem ipsum"
            },
            {
                imageValue:
                "https://unsplash.com/photos/1azkcG0c38A",
                descriptionValue: "Image 2, Lorem ipsum"
            }
        ];

        photos.forEach(({imageValue, descriptionValue}) => {
            const image = cy.get("input[name='image']");
            image.type(imageValue);

            const description = cy.get("input[name='desc']");
            image.type(descriptionValue);

            const button = cy.get("button");
            button.click();

            // check uploaded image is exist
            cy.get("img").should("have.attr", 'src', imageValue);
            cy.contains(descriptionValue);
        });

    });
});