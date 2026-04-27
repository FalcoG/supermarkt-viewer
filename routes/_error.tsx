import { Head } from "fresh/runtime";
import { HttpError, PageProps } from "fresh";

export default function ErrorPage(props: PageProps) {
	const error = props.error; // Contains the thrown Error or HTTPError
	if (error instanceof HttpError) {
		const status = error.status; // HTTP status code

		// Render a 404 not found page
		if (status === 404) {
			return (
				<>
					<Head>
						<title>Pagina niet gevonden</title>
					</Head>
					<div className="px-4 py-8 mx-auto">
						<div className="max-w-screen-md mx-auto flex flex-col justify-center">
							<p className="text-md font-bold text-emerald-600">
								🛒Super Prijzen
							</p>

							<h1 className="text-3xl my-4">Pagina niet gevonden</h1>

							<a href="/" className="underline">
								Naar de homepage
							</a>
						</div>
					</div>
				</>
			);
		}
	}

	return (
		<>
			Unexpected error
		</>
	);
}
