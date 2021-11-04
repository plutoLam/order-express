CREATE TABLE orderlist (
    id       INTEGER         NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
    orderNum VARCHAR ('200') NOT NULL,
    isOver   BOOL            NOT NULL,
    count    INTEGER         NOT NULL,
    data     DATETIME        NOT NULL,
    ALLMONEY REAL            NOT NULL
);
