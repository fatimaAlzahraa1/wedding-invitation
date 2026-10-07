import { supabase } from "../../lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ResponsesPage() {
  async function login(formData: FormData) {
    "use server";

    const password = formData.get("password");

    if (password !== process.env.RESPONSES_PASSWORD) {
      redirect("/responses?error=wrong-password");
    }

    const cookieStore = await cookies();

    cookieStore.set("responses_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/responses");
  }

  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get("responses_auth")?.value === "authenticated";

  if (!isAuthenticated) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f8f3ee",
          color: "#7D0543",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <form
          action={login}
          style={{
            width: "min(400px, 100%)",
            background: "#fff",
            padding: "40px 30px",
            border: "1px solid rgba(125, 5, 67, 0.15)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              marginBottom: "12px",
            }}
          >
            MOHAMED & NADA
          </p>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 500,
              marginBottom: "30px",
            }}
          >
            RSVP Responses
          </h1>

          <input
            type="password"
            name="password"
            required
            placeholder="Enter password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              border: "1px solid rgba(125, 5, 67, 0.25)",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              background: "#7D0543",
              color: "#fff",
              fontSize: "11px",
              letterSpacing: "2px",
              cursor: "pointer",
            }}
          >
            ENTER
          </button>
        </form>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f8f3ee",
          color: "#7D0543",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p>{error.message}</p>
      </main>
    );
  }

  const attendingCount =
    data?.filter((rsvp) => rsvp.attendance === "yes").length ?? 0;

  const notAttendingCount =
    data?.filter((rsvp) => rsvp.attendance === "no").length ?? 0;

  const totalCount = data?.length ?? 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f3ee",
        padding: "60px 20px",
        color: "#7D0543",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "min(900px, 100%)",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            letterSpacing: "4px",
            marginBottom: "12px",
          }}
        >
          MOHAMED & NADA
        </p>

        <h1
          style={{
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontSize: "42px",
            fontWeight: 500,
            marginBottom: "45px",
          }}
        >
          RSVP Responses
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "35px",
          }}
        >
          <div className="response-stat">
            <strong>{totalCount}</strong>
            <span>Total Responses</span>
          </div>

          <div className="response-stat">
            <strong>{attendingCount}</strong>
            <span>Attending</span>
          </div>

          <div className="response-stat">
            <strong>{notAttendingCount}</strong>
            <span>Not Attending</span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {data?.map((rsvp) => (
            <div
              key={rsvp.id}
              style={{
                background: "#fff",
                border: "1px solid rgba(125, 5, 67, 0.15)",
                padding: "22px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "Georgia, serif",
                    fontSize: "22px",
                    fontWeight: 500,
                  }}
                >
                  {rsvp.name}
                </h2>

                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    padding: "7px 12px",
                    border: "1px solid #7D0543",
                  }}
                >
                  {rsvp.attendance === "yes"
                    ? "ATTENDING"
                    : "NOT ATTENDING"}
                </span>
              </div>

              {rsvp.message && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#555",
                  }}
                >
                  {rsvp.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}