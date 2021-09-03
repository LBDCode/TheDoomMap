Postgis spatial query notes	

Construct a polygon from bounding box
	10 10, 10 11, 11 11, 11 10, 10 10
	xmin ymin, xmin ymax, xmax ymax, xmax ymin, xmin ymin
	
	x is long, y is lat
	
	xmin -109.58312988281251
	ymin 37.068327517596586
	xmax -99.12963867187501
	ymax 41.19518982948959

	xmin, ymin,xmax, ymax
-polygons in polygon (intersects)
SELECT *  from drought_conditions where ST_Intersects(geom, 
		ST_GeomFromText('Polygon ((xmin ymin,
						xmin ymax,
						xmax ymax,
						xmax ymin,
						xmin ymin))',4326))


Points in envelope query
SELECT *
FROM   current_fires
WHERE  geom 
    && 
    ST_MakeEnvelope (
		-109.58312988281251, 37.068327517596586,
        -99.12963867187501, 41.19518982948959, -- bounding 
         -- box limits
        4326)
		AND dailyacres > 500