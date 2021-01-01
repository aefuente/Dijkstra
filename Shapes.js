class Line {
            constructor(x1,y1,x2,y2){
                this.x1 = x1;
                this.x2 = x2;
                this.y1 = y1;
                this.y2 = y2;
                this.weight = Math.floor(Math.random() * 10)+10;
                this.connects = []
                this.txtcords = this.textcords();
                this.color = 'rgb(0,0,0)';
            }
            // Finds where to put the text
            textcords(){
                let x;
                let y;
                let slope;
                let slopeinv;
                let intercept;
                // Stores the midpoint of the line
                let midpoint = [];
                midpoint.push((this.x2 + this.x1)/2);
                midpoint.push(-(this.y2+this.y1)/2);
                // Determines if the slope of the line is positive or negative
                if(this.x2 > this.x1)
                    slope = -((this.y2 - this.y1) / (this.x2 - this.x1));
                else
                    slope = -((this.y1 - this.y2) / (this.x1 - this.x2));
                // Finds the inverse of the slope. (so we can create a perpendicular line that goes through the midpoint
                slopeinv = -Math.pow(slope,-1);
                // Finds the intercept of the line. Now we have the equation of the line
                intercept = midpoint[1] - (slopeinv * midpoint[0]);

                // If the line is flat it will have an infinite slops. So we can just set y to either be +25 or -25 px
                if (!isFinite(slopeinv)){
                    if(midpoint[1] > 250)
                        y = -midpoint[1]+25;
                    else
                        y = -midpoint[1]-25;
                    x = midpoint[0];
                }
                // Now we use create a circle around the midpoint, and find the two intersections of our perpendicular line using the quadratic formula
                else {
                    let a = (1 + (slopeinv * slopeinv));
                    let b = (-(2 * midpoint[0]) + ( 2 * slopeinv * intercept) - (2 * midpoint[1] * slopeinv));
                    let c = (Math.pow(midpoint[0],2) + Math.pow(intercept,2) + Math.pow(midpoint[1], 2) - (2 * intercept * midpoint[1]) - 625);
                    let quadratic = Math.sqrt(Math.pow(b, 2) - (4 * a * c));

                    // The quadratic returns us two x values. Depending on where the line is in the canvas we can choose whether the text is
                    // above or below the line.
                    // On the top half of the canvas
                    if(-midpoint[1] < 250){
                        if(slopeinv < 0)
                            x = (-b - quadratic) / (2 * a);
                        else
                            x = (-b + quadratic) / (2 * a);
                        y = -((slopeinv * x) + intercept);
                    }
                    // On the bottom half of the canvas
                    else {
                        if(slopeinv < 0)
                            x = (-b + quadratic) / (2 * a);
                        else
                            x = (-b - quadratic) / (2 * a);
                        y = -((slopeinv * x) + intercept);
                    }
                }
                return [x,y];
            }


            setRed(){
                this.color = 'rgb(253, 29, 29)';
            }
            setDarkBlue(){
                this.color = 'rgb(46, 88, 210)';
            }
            setGreen(){
                this.color = 'rgb(255, 246, 44)';
            }
        }

        class Circle {
            constructor(x, y, count) {
                this.x = x;
                this.y = y;
                this.clickcount = 0;
                this.color = 'rgb(0, 255, 255)';
                this.name = count;
            }

            setRed(){
                this.color = 'rgb(253, 29, 29)';
            }

            setOrange(){
                this.color = 'rgb(255,100,0)';
            }
            setBlue(){
                this.color = 'rgb(0,255,255)';
            }

            setDarkBlue(){
                this.color = 'rgb(46, 88, 210)'
            }
            setGreen(){
                this.color = 'rgb(255, 246, 44)';
            }
        }