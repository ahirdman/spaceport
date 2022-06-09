CREATE TABLE "public"."locations" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "country" text NOT NULL,
    "location" text,
    "site_name" text,
    "coordinates" text,
    PRIMARY KEY ("id"),
    UNIQUE ("id")
);

CREATE TABLE "public"."rockets" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "rocket_name" text,
    PRIMARY KEY ("id"),
    UNIQUE ("id"),
    UNIQUE ("name")
);

CREATE TABLE "public"."missions" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "mission_name" text,
    PRIMARY KEY ("id"),
    UNIQUE ("mission_name")
);

INSERT INTO "public"."locations"("country", "location", "site_name", "coordinates") VALUES('USA', 'Florida', 'Kennedy Space Center', '28.524167, -80.650833') RETURNING "id", "country", "location", "site_name", "coordinates";
INSERT INTO "public"."locations"("country", "location", "site_name", "coordinates") VALUES('USA', 'Florida', 'Cape Canaveral Space Force Station', '28.488889, -80.577778') RETURNING "id", "country", "location", "site_name", "coordinates";
INSERT INTO "public"."locations"("country", "location", "site_name", "coordinates") VALUES('USA', 'California', 'Vandenberg Space Force Base', '34.732778, -120.568056') RETURNING "id", "country", "location", "site_name", "coordinates";