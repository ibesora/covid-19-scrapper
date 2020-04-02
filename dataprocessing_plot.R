setwd('data')
## R libraries
library(ggplot2); library(ggrepel); library(reshape2)

## list files to read later on
a <- list.files()
## create plots folder if not existant
ifelse(!dir.exists(file.path(getwd(), 'plots')), dir.create(file.path(getwd(), 'plots')), FALSE)

## PCRs per age ----
pcrs.age.path <- a[grep('-PCRByAgeRange.csv', a)] ##select files
pcrs.age <- plyr::ldply(pcrs.age.path, read.csv)   ## read CSVs
pcrs.age$range <- paste0(pcrs.age$min, '-', pcrs.age$max) ## generate age ranges
pcrs.age$range <- gsub('NaN-NaN', '>90', pcrs.age$range) ## change NA for >90

## evolution of COVID-19 per age - plot
days <- as.character(seq.Date(from=as.Date('2020-03-29'), to = Sys.Date(), by = 'day')) ## days in the data
pcrs.age$day <- c(sapply(days, function(x)(rep(x, 10)))) ## attach to dataframe
pcrs.age <- pcrs.age[,-c(1:2)]
pcrs.age$range <- factor(pcrs.age$range, levels=c('0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '>90')) ## order factor
jpeg('plots/pcrs_per_age.jpg', width=2500, height=2500, res = 200, units='px')
ggplot(pcrs.age, aes(day, positive, group = range, color = range)) + geom_line() +
  geom_label(data = pcrs.age[pcrs.age$day==days[length(days)],],  aes(label = range), nudge_x = 0.2) + 
  theme(plot.subtitle = element_text(vjust = 1), plot.caption = element_text(vjust = 1), axis.line = element_line(size = 0.5, linetype = "solid"), 
        panel.grid.major = element_line(colour = "gray88", linetype = "dashed"), axis.title = element_text(size = 17, face = "bold"), 
        axis.text = element_text(size = 15, face = "bold", colour = "black"), axis.text.x = element_text(vjust = 0.5, angle = 90), panel.background = element_rect(fill = NA), 
        legend.position='none') +labs(x = NULL, y = "Positius totals", colour = NULL, title = "Evolució del COVID-19 a Catalunya segons edat")
dev.off()

## PCR tests per age
total.pcrs.age <- melt(pcrs.age[pcrs.age$day%in%as.character(Sys.Date()),]) ## filter only last day
jpeg('plots/totalPCR_perage.jpg', width=2500, height=2500, res = 200, units='px')
ggplot(total.pcrs.age, aes(range, value, fill = variable)) + geom_col(position = 'dodge') + scale_y_continuous(expand = c(0, 0)) + 
  theme(plot.subtitle = element_text(vjust = 1), plot.caption = element_text(vjust = 1), axis.line = element_line(linetype = "solid"), 
        axis.title = element_text(size = 17, face = "bold"), axis.text = element_text(size = 16, face = "bold", colour = "black"), 
        legend.text = element_text(size = 12, face = "bold"), legend.title = element_text(size = 16, face = "bold"), 
        panel.background = element_rect(fill = NA), panel.grid.minor.y = element_line(color = 'gray', linetype = 'dashed')) + 
  labs(x = "Edat", y = "PCRs totals", fill = "PCR", 'title' = "PCRs totals segons rang d'edat")
dev.off()

## Positive PCR per age
pcrs.pos <- total.pcrs.age[total.pcrs.age$variable=='positive',] ## filter only positives
pcrs.pos$percent <- (pcrs.pos$value/sum(pcrs.pos$value)) * 100 ## convert to relative frequency
jpeg('plots/positivePCR_perage.jpg', width=2500, height=2500, res = 200, units='px')
ggplot(pcrs.pos, aes(range, percent)) + geom_col() + scale_y_continuous(expand = c(0, 0)) + 
  theme(plot.subtitle = element_text(vjust = 1), plot.caption = element_text(vjust = 1), axis.line = element_line(linetype = "solid"), 
        axis.title = element_text(size = 17, face = "bold"), axis.text = element_text(size = 16, face = "bold", colour = "black"), 
        legend.text = element_text(size = 12, face = "bold"), legend.title = element_text(size = 16, face = "bold"), 
        panel.background = element_rect(fill = NA), panel.grid.minor.y = element_line(color = 'gray', linetype = 'dashed')) + 
  labs(x = "Edat", y = "% positius", title = "PCRs positives per rang d'edat")
dev.off()

## evolution per sanitary region ----
regions.path <- a[grep('-areesBasiques.csv', a)] ## select files
codis <- read.csv2('codis_sanitari.csv', header = T) ## upload identificacio codis sanitaris
poblacio.area <- data.frame('regio' = c('Alt Pirineu i Aran', 'Barcelona', 'Camp de Tarragona', 'Catalunya Central', 'Girona', 'Lleida', 'Terres de l\'Ebre'),
                            'poblacio' = c(67277, 5050190, 607999,  526959, 861753, 362850, 176817)) ## data frame amb poblacio/regio sanitaria (març 2020)

regions <- data.frame() ## create Regions data.frame
paths <- function(x) { 
  a1 <- read.csv(x)
  a1 <- a1[order(a1$id),]
  return(a1[,3])
} ## function to read files and return cases

regions <- sapply(regions.path, paths) ## read files
ids <- read.csv(regions.path[1])[,1:2]
ids <- ids[order(ids$id),]
regions <- data.frame(ids, regions) ## attach regions

codis <- codis[order(codis$Codi),] 
codis$Codi == regions$id ## rename regions

regions$area <- codis$regio
names(regions) <- c('id', 'name', days, 'area') ## update names data.frame Regions
regions.sp <- split(regions, regions$area) ## divide all cities by region
z <- 2+length(days)
regions.sp1 <- lapply(regions.sp, function(x)(
  sapply(x[,3:(2+length(days))], function(y)(sum(y)))
)) ## summ up all cases per region
regions.evol <- as.data.frame(do.call(rbind, regions.sp1))
regions.evol <- as.data.frame(sapply(regions.evol, function(x)(x*100000)/poblacio.area$poblacio)) ## compute cases per 100,000 people
regions.evol$area <- poblacio.area$regio
regions.evol <- melt(regions.evol)#, id.vars = row.names(regions.evol)) 
jpeg("plots/evolucioCOVID_regio.jpg", height=2500, width=2500, res = 200, units='px')
ggplot(regions.evol, aes(variable, value, group = area, color = area)) + geom_line()  +# scale_x_discrete(expand = c(0,0.5)) + 
  geom_label(data = regions.evol[regions.evol$variable==days[length(days)],],  aes(label = area), nudge_x = 0.2) +
  theme(plot.subtitle = element_text(vjust = 1), 
    plot.caption = element_text(vjust = 1), 
    axis.line = element_line(size = 0.4, 
        linetype = "solid"), panel.grid.major = element_line(colour = "gray84", 
        linetype = "dashed"), panel.grid.minor = element_line(colour = "gray91", 
        linetype = "blank"), axis.title = element_text(size = 15, 
        face = "bold"), axis.text = element_text(size = 14, 
        face = "bold", colour = "black"), 
    axis.text.x = element_text(vjust = 0.5, 
        angle = 90), legend.text = element_text(face = "bold"), 
    legend.position ='none', 
    panel.background = element_rect(fill = NA), 
    legend.key = element_rect(fill = NA), 
    legend.background = element_rect(fill = NA)) +labs(title = "Evolució COVID-19 per Àrea Sanitària", 
    x = NULL, y = "#/100000 habitants", colour = "Area")
dev.off()
