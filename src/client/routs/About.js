import React, { useState } from "react";
import WelcomeImage from "../components/WelcomeImage";

export default function About() {
    return <main>
        <WelcomeImage title="Website api for sharing meals together. Invite your best friends or your family for dinner!" subtitle="This App is part of HackYourFuture learnig course homework" >
            <a className="btn-link bgn-green" href="https://www.hackyourfuture.dk/">HackYourFuture</a>
        </WelcomeImage>
    </main>
}