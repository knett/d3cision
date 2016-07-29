library(rpart)
library(partykit)
library(rCharts)
library(jsonlite)


#set up a little rpart as an example
rp <- rpart(
  hp ~ cyl + disp + mpg + drat + wt + qsec + vs + am + gear + carb,
  method = "anova",
  data = mtcars,
  control = rpart.control(minsplit = 4)
)

#convert it to partykit rpart so we can use structure
rpk <- as.party(rp)
