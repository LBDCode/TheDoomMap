
CREATE TABLE storm_track_lin (
    gid integer NOT NULL,
    stormname character varying(50),
    stormtype character varying(50),
    advdate character varying(50),
    advisnum character varying(50),
    stormnum numeric,
    fcstprd numeric,
    basin character varying(50),
    geom geometry(MultiLineString)
);



CREATE SEQUENCE storm_track_lin_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE storm_track_lin_gid_seq OWNED BY storm_track_lin.gid;



ALTER TABLE storm_track_lin ALTER COLUMN gid SET DEFAULT nextval('storm_track_lin_gid_seq'::regclass);


INSERT INTO storm_track_lin (gid, stormname, stormtype, advdate, advisnum, stormnum, fcstprd, basin, geom) VALUES (16, 'Hilda', 'TD', '800 AM PDT Thu Aug 05 2021', '24', 8.0, 120, 'EP', '01050000000100000001020000000500000066666666664660C000000000000035409A999999997960C03333333333B33540CDCCCCCCCCBC60C0000000000080364033333333330361C033333333333337409A999999994961C06666666666E63740');
INSERT INTO storm_track_lin (gid, stormname, stormtype, advdate, advisnum, stormnum, fcstprd, basin, geom) VALUES (17, 'Jimena', 'TS', '500 AM HST Thu Aug 05 2021', '11', 9.0, 120, 'EP', '01050000000100000001020000000700000066666666662661C09A9999999919304066666666663661C00000000000803040CDCCCCCCCC5C61C0000000000080314066666666668661C000000000008032400000000000B061C00000000000803340CDCCCCCCCCDC61C0CDCCCCCCCC4C34409A999999990962C06666666666E63440');



SELECT pg_catalog.setval('storm_track_lin_gid_seq', 17, true);


ALTER TABLE storm_track_lin
    ADD CONSTRAINT storm_track_lin_pkey PRIMARY KEY (gid);

