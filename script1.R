# party -------------------------------------------------------------------
# http://bl.ocks.org/timelyportfolio/adc2dfee7aef48ce5485

library(partykit)

x <- ctree(Species ~ ., data = iris)

plot(x)

attributes(x)

str(x$info)

str(x$node)

x$node$id
x$node$split


as.list(x$node)



jsonlite::toJSON(as.list(x$node), pretty = TRUE)
str(x[[1]])

x[[1]]

get

class(x[[1]])
class(x[[1]][[1]])

y <- x[[1]][[4]]
y <- x[[1]][[7]]
partykit::surrogates_node()
class(y)
length(y)
toString(y)
str(y)

get_childrens <- function(x) {
  
  if(length(x) > 0)
    purrr::map(x, get_childrens)
  else 
    return(list("a" = 2))
  
}

get_childrens(x[[1]])

class(x[[1]][[4]])
x[[1]][[7]]

attr(x, "tree")

get_ctree_parts <- function(x, ...)
{
  UseMethod("get_ctree_parts")
}

get_ctree_parts.BinaryTree <- function(x, ...)
{
  get_ctree_parts(attr(x, "tree"))
}

get_ctree_parts.constparty <- function(x, ...)
{
  get_ctree_parts(attr(x, "tree"))
}

get_ctree_parts.SplittingNode <- function(x, ...)
{
  with(
    x,
    list(
      name       = toString(nodeID),
      children   = list(get_ctree_parts(x$left),get_ctree_parts(x$right))
      
    )
  )
}

get_ctree_parts.TerminalNode <- function(x, ...)
{
  with(
    x,
    list(
      name = paste(nodeID,"weights",sum(weights),"prediaction",toString(paste("[",toString(prediction),"]",sep=" ")),sep = " ")
      
    )
  )
}

class(irisct)
x <- irisct

partykit:::print.partynode
partykit:::print.constparty


jsonlite::toJSON(get_ctree_parts(as.party(irisct)))

# rpart -------------------------------------------------------------------
library(rpart)

fit <- rpart(Kyphosis ~ Age + Number + Start, method = "class", data = kyphosis)
fit
plot(fit)
text(fit)
str(fit)
