-- CreateIndex
CREATE INDEX "Articles_is_active_score_idx" ON "Articles"("is_active", "score" DESC);

-- CreateIndex
CREATE INDEX "City_is_active_score_idx" ON "City"("is_active", "score" DESC);

-- CreateIndex
CREATE INDEX "Colleges_is_active_score_idx" ON "Colleges"("is_active", "score" DESC);
